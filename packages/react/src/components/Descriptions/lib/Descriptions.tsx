import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import { DescriptionsItemProps } from "./DescriptionsItem";
import { Layout, PLayout } from "./Col";
import { Row } from "./Row";

const sizes = ["large", "normal", "small"] as const;
export type Size = typeof sizes[number];
const PSize = PropTypes.oneOf([...sizes]);

export interface DescriptionsProps extends ClassNameAndStyle {
  bordered?: boolean;
  column?: number;
  layout?: Layout;
  size?: Size;
  children?: React.ReactNode;
}

const generateRowsData = (
  columnsData: DescriptionsItemProps[],
  size: number
) => {
  const rowsData: DescriptionsItemProps[][] = [];
  let rowData: DescriptionsItemProps[] = [];
  let curSize = 0;

  columnsData.forEach((data, index) => {
    if (curSize <= 0) {
      rowData = [];
      rowsData.push(rowData);
      curSize = size;
    }
    let { span = 1 } = data;
    // Current span doesn't more than remaining size
    // Last span must align the end of Descriptions
    span = span > curSize || columnsData.length - 1 === index ? curSize : span;

    rowData.push({ ...data, span });
    curSize -= span;
  });

  return rowsData;
};

export const Descriptions: React.FC<DescriptionsProps> = props => {
  const {
    bordered = false,
    column = 3,
    layout = "horizontal",
    size = "normal",
    children,
    className,
    style = {}
  } = props;

  const className2Use: string = classNames(
    "c-descriptions",
    bordered ? `c-descriptions--bordered` : null,
    {
      [`c-descriptions--${size}`]: sizes.some(s => s === size)
    },
    className
  );

  const validChildrenData = (React.Children.toArray(children) as JSX.Element[])
    .map(child => (React.isValidElement(child) ? child : null))
    .filter(node => Boolean(node))
    .map(node => (node as React.ReactElement<DescriptionsItemProps>).props);

  return (
    <table className={className2Use} style={style}>
      <tbody>
        {generateRowsData(validChildrenData, column).map((rowData, index) => (
          <Row data={rowData} layout={layout} bordered={bordered} key={index} />
        ))}
      </tbody>
    </table>
  );
};

Descriptions.propTypes = {
  bordered: PropTypes.bool,
  column: PropTypes.number,
  layout: PLayout,
  size: PSize,
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object
};

Descriptions.displayName = "Descriptions";
