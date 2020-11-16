import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isIE as detectIE } from "@clair/helpers";
import {
  ColResponsiveProps,
  ResponsiveColValuesUnion,
  ColStaticProps,
  Sizes,
  useWhichMedia
} from "./responsive";

type ColProps = React.PropsWithChildren<
  ColResponsiveProps & ColStaticProps & ClassNameAndStyle
>;

export const getGridStart = (start: number = 0) => {
  if (start === 0) {
    return "";
  }
  return `${start} / `;
};

export const getGridSpan = (span: number = 1) => {
  return `span ${span}`;
};

// style: grid-column
const getGridColumnStyle = (
  option: Pick<ColProps, "span" | "start">
): React.CSSProperties => {
  const { start, span } = option;
  return {
    gridColumn: `${getGridStart(start)}${getGridSpan(span)}`
  };
};

interface GridStyleForIE extends React.CSSProperties {
  "-ms-grid-column"?: React.CSSProperties["gridColumn"];
  "-ms-grid-column-span"?: number | never;
}

// need to apply -ms- prefix and use specific property for IE

const getGridColumnStyleForIE = (
  option: Pick<ColProps, "span" | "start">
): GridStyleForIE => {
  const { start, span = 1 } = option;
  // 0 || string
  const useStart: boolean = !start || isNaN(start);
  // have to consider the fake gap, which actually takes one column
  // 0 -> 0
  // n -> 2n + 1
  const start2Use = useStart ? start : (start as number) * 2 + 1;
  return {
    "-ms-grid-column": start2Use || void 0,
    // span - 1 is the total fake gaps between columns
    "-ms-grid-column-span": span + (span - 1) || 1
  };
};

// style: order
export const getOrderStyle = (
  order: ColProps["order"]
): React.CSSProperties => {
  if (isNaN(order)) {
    return {};
  }
  return {
    order
  };
};

// number -> object
export const convertUnionToValues = (
  item: ResponsiveColValuesUnion
): ColStaticProps => {
  if (typeof item === "number") {
    return {
      span: item
    };
  }
  return item;
};

function Col(props: ColProps) {
  const {
    children,
    className,
    start,
    span,
    order,
    style = {},
    xs,
    sm,
    md,
    lg,
    xl,
    xxl
  } = props;
  const responsiveProps = { xs, sm, md, lg, xl, xxl };
  const responsive = Object.entries(responsiveProps) as [
    Sizes,
    ResponsiveColValuesUnion
  ][];
  const mediaList = useWhichMedia();
  // detect IE
  const [isIE, updateIE] = useState(false);
  useEffect(() => {
    updateIE(detectIE(navigator.userAgent));
  }, []);
  // add prefix for IE 10 + 11
  const gridColumnStyle: GridStyleForIE = isIE
    ? getGridColumnStyleForIE({ start, span })
    : getGridColumnStyle({ start, span });
  const orderStyle: React.CSSProperties = getOrderStyle(order);
  // add prefix for IE 10
  if (isIE) {
    orderStyle.msOrder = orderStyle.order;
  }
  // static Col
  if (!responsive.filter(([, props]) => Boolean(props)).length) {
    // get basic style for non-responsive Col
    const style2Use: GridStyleForIE = {
      ...gridColumnStyle,
      ...orderStyle,
      ...style
    };
    return (
      <div
        className={classNames("c-grid__col", className)}
        style={(style2Use as unknown) as React.CSSProperties}
      >
        {children}
      </div>
    );
  }
  const [result = <></>] = (Object.entries(mediaList) as [
    Sizes,
    ColStaticProps
  ][])
    .filter(([, match]) => match)
    .map(([size]) => {
      const staticProps = Boolean(responsiveProps[size])
        ? convertUnionToValues(responsiveProps[size] as number | ColStaticProps)
        : {
            start,
            order,
            span
          };
      return (
        <Col {...staticProps} className={className} style={style} key={size}>
          {children}
        </Col>
      );
    });
  return result;
}

const PResponsive = PropTypes.oneOfType([
  PropTypes.number,
  PropTypes.shape({
    start: PropTypes.number,
    span: PropTypes.number,
    order: PropTypes.number
  })
]);

Col.propTypes = {
  span: PropTypes.number,
  start: PropTypes.number,
  order: PropTypes.number,
  xs: PResponsive,
  sm: PResponsive,
  md: PResponsive,
  lg: PResponsive,
  xl: PResponsive,
  xxl: PResponsive,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Col.displayName = "Col";

export { Col };
