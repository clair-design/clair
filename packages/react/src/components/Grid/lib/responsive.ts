import useMedia from "react-use/esm/useMedia";

export const useWhichMedia = () => {
  return {
    xs: useMedia("(max-width: 600px)"),
    sm: useMedia("(min-width: 601px) and (max-width: 900px)"),
    md: useMedia("(min-width: 901px) and (max-width: 1200px)"),
    lg: useMedia("(min-width: 1201px) and (max-width: 1920px)"),
    xl: useMedia("(min-width: 1921px) and (max-width: 2560px)"),
    xxl: useMedia("(min-width: 2561px)")
  };
};

export type Sizes = keyof ColResponsiveProps;

export interface ColStaticProps {
  start?: number;
  span?: number;
  order?: number;
}

export type ResponsiveColValuesUnion = ColStaticProps | number;

export interface ColResponsiveProps {
  xs?: ResponsiveColValuesUnion;
  sm?: ResponsiveColValuesUnion;
  md?: ResponsiveColValuesUnion;
  lg?: ResponsiveColValuesUnion;
  xl?: ResponsiveColValuesUnion;
  xxl?: ResponsiveColValuesUnion;
}

export interface RowStaticProps {
  gutter?: React.CSSProperties["gridGap"];
  justify?: React.CSSProperties["justifyContent"];
  align?: React.CSSProperties["alignItems"];
}

export interface RowResponsiveProps {
  xs?: RowStaticProps;
  sm?: RowStaticProps;
  md?: RowStaticProps;
  lg?: RowStaticProps;
  xl?: RowStaticProps;
  xxl?: RowStaticProps;
}
