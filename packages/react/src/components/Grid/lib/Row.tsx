import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { isIE as detectIE } from "@clair/helpers";
import {
  RowStaticProps,
  RowResponsiveProps,
  Sizes,
  useWhichMedia
} from "./responsive";
import { Col } from "./Col";

type RowProps = React.PropsWithChildren<
  RowStaticProps & RowResponsiveProps & ClassNameAndStyle
>;

function Row(props: RowProps) {
  const {
    children,
    className,
    style = {},
    gutter = "0",
    justify = "flex-start",
    align = "stretch",
    xs,
    sm,
    md,
    lg,
    xl,
    xxl
  } = props;
  const responsiveProps = { xs, sm, md, lg, xl, xxl };
  const responsive = Object.entries(responsiveProps);
  const mediaList = useWhichMedia();
  // update whether the browser is IE
  const [isIE, updateIE] = useState(false);
  useEffect(() => {
    updateIE(detectIE(navigator.userAgent));
  }, []);
  const [columnGap = "0px", rowGap = "0px"] = (gutter as string).split(" ");
  // use fake grid item to mimic grid-gap
  const rowStyleForIE: React.CSSProperties = isIE
    ? {
        msGridColumns: `(1fr ${columnGap})[11] 1fr`,
        msGridRows: `1fr ${rowGap}`
      }
    : {};
  // static Row
  if (!responsive.filter(([, props]) => Boolean(props)).length) {
    let newChildren: React.ReactNode;
    // handle align for IE 10 + 11
    // ! no solution for justify now
    if (isIE) {
      newChildren = React.Children.map(children, child => {
        if ((child as React.ReactElement).type !== Col) {
          return child;
        }

        const {
          style: oldChildStyle = {}
        } = (child as React.ReactElement).props;
        return React.cloneElement(child as React.ReactElement, {
          style: {
            "-ms-grid-column-align": align,
            ...oldChildStyle
          }
        });
      });
    } else {
      newChildren = children;
    }

    const style2Use: React.CSSProperties = {
      gridGap: gutter,
      justifyContent: justify,
      alignItems: align,
      ...rowStyleForIE,
      ...style
    };
    return (
      <div className={classNames("c-grid__row", className)} style={style2Use}>
        {newChildren}
      </div>
    );
  }
  const [result = <></>] = (Object.entries(mediaList) as [
    Sizes,
    RowStaticProps
  ][])
    .filter(([, match]) => match)
    .map(([size]) => {
      const staticProps = Boolean(responsiveProps[size])
        ? responsiveProps[size]
        : {
            gutter,
            justify,
            align
          };
      return (
        <Row {...staticProps} className={className} style={style} key={size}>
          {children}
        </Row>
      );
    });
  return result;
}

const PResponsive = PropTypes.shape({
  gutter: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string
});

Row.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  gutter: PropTypes.string,
  justify: PropTypes.string,
  align: PropTypes.string,
  xs: PResponsive,
  sm: PResponsive,
  md: PResponsive,
  lg: PResponsive,
  xl: PResponsive,
  xxl: PResponsive
};

Row.displayName = "Row";

export { Row };
