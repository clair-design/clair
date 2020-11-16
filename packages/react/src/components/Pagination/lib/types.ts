import PropTypes from "prop-types";

export const sizes = ["normal", "small"] as const;
type Size = typeof sizes[number];
const PSize = PropTypes.oneOf(sizes);

export type onChangePage = (page: number) => void;

type ChangeEvent = CCustomEvent<{
  page: number;
  pageSize: number;
}>;

export interface PaginationProps {
  current?: number;
  total: number;
  pageSize?: number;
  span?: number;
  simple?: boolean;
  size?: Size;
  layout?: string;
  hideOnSinglePage?: boolean;
  onChange?: (e: ChangeEvent) => any;
}

export interface PageProps {
  active: boolean;
  page: number;
  onClick: onChangePage;
}

export interface PageContentProps {
  currentPage: number;
  totalPage: number;
  onChange: onChangePage;
  span?: number;
}

export interface PrevPageProps {
  currentPage: number;
  onClick: onChangePage;
}

export interface NextPageProps {
  currentPage: number;
  totalPage: number;
  onClick: onChangePage;
}

export interface EllipsisPageProps {
  currentPage: number;
  toward: "prev" | "next";
  onClick: onChangePage;
  span: number;
}

export interface JumperProps {
  onEnter: onChangePage;
}

export interface TotalProps {
  total: number;
}

export const PaginationPropTypes = {
  current: PropTypes.number,
  total: PropTypes.number.isRequired,
  pageSize: PropTypes.number,
  hideOnSinglePage: PropTypes.bool,
  size: PSize,
  simple: PropTypes.bool,
  span: PropTypes.number,
  layout: PropTypes.string,
  onChange: PropTypes.func
  // onPageSizeChange: PropTypes.func
};
