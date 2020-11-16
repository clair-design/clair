import React, { useState, useEffect } from "react";
import { getLogicalPage } from "./utils";
import { PageContentProps } from "./types";
import { Input } from "@components/Input";

const SimplePagination = ({
  currentPage,
  totalPage,
  onChange
}: PageContentProps) => {
  const [value, setValue] = useState(currentPage.toString());

  const onChangeHandler = (e: CFormEvent) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    if (value !== currentPage.toString()) {
      setValue(currentPage.toString());
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const pageNumber = Number(value);
      if (!pageNumber) {
        return;
      }
      const logicPage = getLogicalPage(pageNumber, totalPage);
      if (value !== logicPage.toString()) {
        setValue(logicPage.toString());
      }
      onChange(logicPage);
    }
  };

  useEffect(() => {
    setValue(currentPage.toString());
  }, [currentPage]);

  return (
    <>
      <Input
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChangeHandler}
        onBlur={onBlur}
      />
      <span className="c-pagination__slash">/</span>
      <span className="c-pagination__total-page">{totalPage}</span>
    </>
  );
};

export default SimplePagination;
