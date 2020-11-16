import React from "react";
import { Page, EllipsisPage } from "./Page";
import { PageContentProps } from "./types";
import { getStartEndPage } from "./utils";

const NormalPagination = ({
  currentPage,
  totalPage,
  span,
  onChange
}: PageContentProps) => {
  const validSpan = span && span >= 1 ? Math.round(span) : 2;

  const [startPage, endPage] = getStartEndPage({
    currentPage,
    totalPage,
    span: validSpan
  });
  const list = Array.from(Array(endPage - startPage + 1).keys()).map(i => {
    const index = i + startPage;
    return (
      <Page
        key={index}
        page={index}
        active={index === currentPage}
        onClick={onChange}
      />
    );
  });

  return (
    <>
      {startPage !== 1 ? (
        <>
          <Page page={1} active={false} onClick={onChange} />
          <EllipsisPage
            currentPage={currentPage}
            toward="prev"
            onClick={onChange}
            span={validSpan}
          />
        </>
      ) : null}
      {list}
      {endPage !== totalPage ? (
        <>
          <EllipsisPage
            currentPage={currentPage}
            toward="next"
            onClick={onChange}
            span={validSpan}
          />
          <Page page={totalPage} active={false} onClick={onChange} />
        </>
      ) : null}
    </>
  );
};

export default NormalPagination;
