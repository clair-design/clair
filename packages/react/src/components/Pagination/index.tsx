import React, { useState } from "react";
import { PrevPage, NextPage } from "./lib/Page";
import SimplePagination from "./lib/SimplePagination";
import NormalPagination from "./lib/NormalPagination";
import classNames from "classnames";
import { PaginationProps, PaginationPropTypes, sizes } from "./lib/types";
import Jumper from "./lib/Jumper";
import Total from "./lib/Total";
import { getLogicalPage } from "./lib/utils";

export const Pagination: React.FC<PaginationProps> = props => {
  const {
    current = 1,
    total,
    pageSize = 10,
    onChange,
    span,
    simple = false,
    size = "normal",
    hideOnSinglePage,
    layout = "pages"
  } = props;
  const totalPage = Math.ceil(total / pageSize);

  const [currentPage, setCurrentPage] = useState(
    getLogicalPage(current, total)
  );

  const onChangeHandler = (page: number) => {
    if (page === currentPage) {
      return;
    }
    const logicalPage = getLogicalPage(page, totalPage);
    setCurrentPage(logicalPage);
    onChange &&
      onChange({
        detail: {
          page: logicalPage,
          pageSize
        }
      });
  };

  const className = classNames("c-pagination", {
    [`c-pagination--simple`]: simple,
    [`c-pagination--${size}`]: !simple && sizes.some(t => t === size),
    "c-pagination--hidden": hideOnSinglePage && total === 1
  });

  const content = simple ? (
    <SimplePagination
      currentPage={currentPage}
      totalPage={totalPage}
      onChange={onChangeHandler}
    />
  ) : (
    <NormalPagination
      currentPage={currentPage}
      span={span}
      totalPage={totalPage}
      onChange={onChangeHandler}
    />
  );

  const layoutMap: {
    [index: string]: JSX.Element | null;
  } = {
    pages: (
      <div key="pages">
        <PrevPage currentPage={currentPage} onClick={onChangeHandler} />
        {content}
        <NextPage
          currentPage={currentPage}
          totalPage={totalPage}
          onClick={onChangeHandler}
        />
      </div>
    ),
    total: <Total total={total} key="total" />,
    jumper: simple ? null : <Jumper onEnter={onChangeHandler} key="jumper" />
  };

  return (
    <nav className={className} role="navigation" aria-label="分页器">
      {
        new Set(
          layout.split(",").map((item: string) => layoutMap[item] || null)
        )
      }
    </nav>
  );
};

Pagination.propTypes = PaginationPropTypes;

Pagination.displayName = "Pagination";
