import React from "react";
import { DescriptionsItemProps, DescriptionsItem } from "./DescriptionsItem";
import PropTypes from "prop-types";
import { Col, Layout, PLayout, Type } from "./Col";

export interface RowProps {
  bordered: boolean;
  layout: Layout;
  data: DescriptionsItemProps[];
}

export const Row: React.FC<RowProps> = props => {
  const { bordered, data: rowData, layout } = props;

  const renderCols = (type?: Type) => (
    <tr className="c-descriptions-row">
      {rowData.map((colData, idx) => {
        return (
          <Col
            data={colData}
            layout={layout}
            bordered={bordered}
            key={idx}
            type={type}
          />
        );
      })}
    </tr>
  );

  if (layout === "vertical") {
    return (
      <React.Fragment>
        {renderCols("label")}
        {renderCols("content")}
      </React.Fragment>
    );
  }

  return <React.Fragment>{renderCols()}</React.Fragment>;
};

Row.propTypes = {
  bordered: PropTypes.bool.isRequired,
  layout: PLayout.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({ ...DescriptionsItem.propTypes }))
    .isRequired
} as PropTypes.ValidationMap<RowProps>;

Row.displayName = "Row";
