import React from "react";
import classnames from "classnames";
import {
  PageProps,
  PrevPageProps,
  NextPageProps,
  EllipsisPageProps
} from "./types";
import {
  IconArrowLeft,
  IconArrowRight,
  IconDoubleArrowLeft,
  IconDoubleArrowRight
} from "@components/Icon";

export const Page = ({ page, active, onClick }: PageProps) => {
  const mergeClassName = classnames("c-pagination__page", {
    "c-pagination__page--active": active
  });

  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick && onClick(page);
  };

  return (
    <button
      className={mergeClassName}
      aria-label={`跳转到第${page}页`}
      aria-current={active}
      onClick={onClickHandler}
      disabled={active}
    >
      {page}
    </button>
  );
};

export const PrevPage = ({ currentPage, onClick }: PrevPageProps) => {
  const disabled = currentPage === 1;
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick && onClick(currentPage - 1);
  };

  return (
    <button
      className="c-pagination__prev"
      aria-label="上一页"
      onClick={onClickHandler}
      disabled={disabled}
    >
      <IconArrowLeft />
    </button>
  );
};

export const NextPage = ({
  currentPage,
  totalPage,
  onClick
}: NextPageProps) => {
  const disabled = currentPage === totalPage;
  const onClickHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    onClick && onClick(currentPage + 1);
  };

  return (
    <button
      className="c-pagination__next"
      aria-label="下一页"
      onClick={onClickHandler}
      disabled={disabled}
    >
      <IconArrowRight />
    </button>
  );
};

export const EllipsisPage = ({
  currentPage,
  toward,
  onClick,
  span
}: EllipsisPageProps) => {
  const isTowardPrev = toward === "prev";
  const step = span + span + 1;

  const onClickHandler = () => {
    let targetPage;
    if (isTowardPrev) {
      targetPage = currentPage - step;
    } else {
      targetPage = currentPage + step;
    }
    onClick && onClick(targetPage);
  };

  const title = isTowardPrev ? `向前${step}页` : `向后${step}页`;

  return (
    <button
      className="c-pagination__ellipsis"
      title={title}
      onClick={onClickHandler}
    >
      <span>...</span>
      {isTowardPrev ? <IconDoubleArrowLeft /> : <IconDoubleArrowRight />}
    </button>
  );
};
