import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { isNull } from "lodash-es";
import { Content } from "./lib/Content";
import { Footer, FooterProps } from "./lib/Footer";
import { useFocusRef } from "@src/utils";
import { TooltipCore, propTypes } from "@components/Tooltip/lib/TooltipCore";
import { ConfirmContext } from "./lib/ConfirmContext";
import { TooltipCoreProps } from "@components/Tooltip/lib/types/tooltip";

interface PopConfirmProps extends TooltipCoreProps {
  footer?: React.ReactNode;
  onConfirm?: FooterProps["onConfirm"];
  onCancel?: FooterProps["onCancel"];
}

function ContentForTooltip(
  props: Pick<PopConfirmProps, "content" | "footer" | "onConfirm" | "onCancel">
): React.ReactElement {
  const {
    content,
    footer,
    onCancel = () => void 0,
    onConfirm = () => void 0
  } = props;
  // treat null as a valid option
  // null is used to remove footer
  const useFooter: boolean = React.isValidElement(footer) || isNull(footer);
  const footer2Use = useFooter ? (
    footer
  ) : (
    <Footer onConfirm={onConfirm} onCancel={onCancel} />
  );
  return (
    <React.Fragment>
      <Content>{content}</Content>
      {footer2Use}
    </React.Fragment>
  );
}

export const PopConfirm: React.FC<PopConfirmProps> = (
  props
): React.ReactElement => {
  const {
    visible,
    children,
    content,
    onCancel = () => void 0,
    onConfirm = () => void 0,
    footer,
    trigger = "click",
    onVisibilityChange = () => void 0,
    ...toolTipCoreProps
  } = props;
  const [ownVisible, updateOwnVisible] = useState(false);

  const closePopConfirm = (): void => updateOwnVisible(false);
  let onCancel2Use: PopConfirmProps["onCancel"] = onCancel;
  let onConfirm2Use: PopConfirmProps["onConfirm"] = onConfirm;
  const usingPropsVisible: boolean = typeof visible === "boolean";
  const visible2Use: boolean = usingPropsVisible
    ? (visible as boolean)
    : ownVisible;
  const validChildren = React.Children.only(children);
  // if using own state
  // update onConfirm and onCancel
  // assign onClick to children
  if (!usingPropsVisible) {
    onCancel2Use = (e: React.SyntheticEvent) => {
      return Promise.resolve(onCancel(e)).then(closePopConfirm);
    };
    onConfirm2Use = (e: React.SyntheticEvent) => {
      return Promise.resolve(onConfirm(e)).then(closePopConfirm);
    };
  }
  // ref of the popcofirm DOM
  const forwardRef = useRef<HTMLDivElement>(null);
  // focus on confirm button when popconfirm is visible
  const confirmRef = useFocusRef<HTMLButtonElement>({
    visible: visible2Use,
    async: true
  });

  const onVisibilityChange2Use: TooltipCoreProps["onVisibilityChange"] = param => {
    const {
      detail: { visible }
    } = param;
    updateOwnVisible(visible);
    onVisibilityChange(param);
  };

  // since passing `visible` down to TooltipCore
  // no need to set trigger explicitly since it is only useful for stateful TooltipCore
  return (
    <ConfirmContext.Provider
      value={{
        confirmRef
      }}
    >
      <TooltipCore
        {...toolTipCoreProps}
        trigger={trigger}
        onVisibilityChange={onVisibilityChange2Use}
        className="c-popconfirm"
        visible={visible2Use}
        role="dialog"
        ref={forwardRef}
        content={
          <ContentForTooltip
            content={content}
            footer={footer}
            onCancel={onCancel2Use}
            onConfirm={onConfirm2Use}
          />
        }
      >
        {validChildren}
      </TooltipCore>
    </ConfirmContext.Provider>
  );
};

const PopConfirmPropTypes = {
  ...propTypes,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  footer: PropTypes.node
} as PropTypes.ValidationMap<PopConfirmProps>;

PopConfirm.propTypes = PopConfirmPropTypes;
PopConfirm.displayName = "PopConfirm";
