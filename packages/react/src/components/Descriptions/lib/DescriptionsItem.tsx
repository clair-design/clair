import React from "react";
import PropTypes from "prop-types";

export interface DescriptionsItemProps extends ClassNameAndStyle {
  label?: React.ReactNode;
  children: React.ReactNode;
  span?: number;
}

export const DescriptionsItem: React.FC<DescriptionsItemProps> = ({
  children
}) => children as JSX.Element;

DescriptionsItem.propTypes = {
  label: PropTypes.node,
  children: PropTypes.node.isRequired,
  span: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

DescriptionsItem.displayName = "DescriptionsItem";
