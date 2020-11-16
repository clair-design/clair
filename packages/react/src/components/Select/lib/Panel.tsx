import React, { FC } from "react";
import PropTypes from "prop-types";
import { FilteredChild } from "@components/Select/lib/helper";
import {
  RenderOptionGroup,
  RenderOptionGroupProps
} from "@components/Select/lib/OptionGroup";
import { OptionProps, RenderOption } from "@components/Select/lib/Option";

interface PanelProps {
  loading: boolean;
  loadingText: string;
  filteredChildren: Array<FilteredChild>;
  hasChildren: boolean;
}

export const Panel: FC<PanelProps> = props => {
  const { loading, loadingText, filteredChildren, hasChildren } = props;
  if (loading) {
    return <div className="c-select__option--empty">{loadingText}</div>;
  } else if (!filteredChildren.length) {
    return (
      <div className="c-select__option--empty">
        {hasChildren ? "无匹配数据" : "无数据"}
      </div>
    );
  }
  return (
    <>
      {filteredChildren.map((item: FilteredChild, i) => {
        if (item.displayName === "OptionGroup") {
          return (
            <RenderOptionGroup
              {...(item.props as RenderOptionGroupProps)}
              key={i}
            />
          );
        }
        return <RenderOption optionProps={item.props as OptionProps} key={i} />;
      })}
    </>
  );
};

Panel.propTypes = {
  loading: PropTypes.bool.isRequired,
  loadingText: PropTypes.string.isRequired,
  filteredChildren: PropTypes.array.isRequired,
  hasChildren: PropTypes.bool.isRequired,
  children: PropTypes.node
} as PropTypes.ValidationMap<PanelProps>;

Panel.displayName = "Panel";
