import React from "react";
import PropTypes from "prop-types";
import { BreadcrumbContext } from "./Context";

type Text = React.ReactNode;
const PText = PropTypes.node;

export interface BreadcrumbProps {
  children: Text;
  separator?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = props => {
  const { children, separator, ...rest } = props;
  const contextValue = {
    separator
  };

  return (
    <nav className="c-breadcrumb" role="navigation" {...rest}>
      <BreadcrumbContext.Provider value={contextValue}>
        {children}
      </BreadcrumbContext.Provider>
    </nav>
  );
};

Breadcrumb.propTypes = {
  children: PText.isRequired,
  separator: PropTypes.node
};

Breadcrumb.displayName = "Breadcrumb";
