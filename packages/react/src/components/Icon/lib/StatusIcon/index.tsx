import React, { CSSProperties } from "react";
import classNames from "classnames";
import { getStyleMergedComponent } from "@src/utils";
import { IconProps as BaseIconProps } from "../Container";
import { IconCheckedCircleFill } from "../Checked";
import { IconExclamationCircleFill } from "../Exclamation";
import { IconCloseCircleFill } from "../Close";
import { IconInfoCircleFill } from "../Info";

type Status =
  | "is-success"
  | "is-warning"
  | "is-danger"
  | "is-info"
  | "is-error";

const getClassNameAndStyle = (status: Status): ClassNameAndStyle => {
  return {
    className: classNames(
      "c-icon--fill",
      `c-icon--${status.replace(/^is-/, "")}`,
      status === "is-error" ? "is-danger" : status
    )
  };
};

export const IconStatusSuccess = getStyleMergedComponent<BaseIconProps>(
  getClassNameAndStyle("is-success")
)(IconCheckedCircleFill);

IconStatusSuccess.displayName = "IconStatusSuccess";

export const IconStatusWarning = getStyleMergedComponent<BaseIconProps>(
  getClassNameAndStyle("is-warning")
)(IconExclamationCircleFill);

IconStatusWarning.displayName = "IconStatusWarning";

export const IconStatusDanger = getStyleMergedComponent<BaseIconProps>(
  getClassNameAndStyle("is-danger")
)(IconCloseCircleFill);

export const IconStatusError = getStyleMergedComponent<BaseIconProps>(
  getClassNameAndStyle("is-error")
)(IconCloseCircleFill);

IconStatusError.displayName = "IconStatusError";

IconStatusDanger.displayName = "IconStatusDanger";

export const IconStatusInfo = getStyleMergedComponent<BaseIconProps>(
  getClassNameAndStyle("is-info")
)(IconInfoCircleFill);

IconStatusInfo.displayName = "IconStatusInfo";

interface IconProps {
  [key: string]: any; // eslint-disable-line
}

const types = ["success", "warning", "error", "danger", "info"] as const;
export type Type = typeof types[number];

// keep it to not to break import reference
export interface StatusIconProps extends IconProps {
  type?: Type;
}

export const getStatusIcon = (
  type: Type = "info",
  props: BaseIconProps = {}
) => {
  // eslint-disable-next-line
  const { style, ...rest } = props;
  const mergedStyle: CSSProperties = {
    ...style
  };
  switch (type) {
    case "info":
      return <IconStatusInfo {...rest} style={mergedStyle} />;
    case "success":
      return <IconStatusSuccess {...rest} style={mergedStyle} />;
    case "warning":
      return <IconStatusWarning {...rest} style={mergedStyle} />;
    case "danger":
      return <IconStatusDanger {...rest} style={mergedStyle} />;
    case "error":
      return <IconStatusError {...rest} style={mergedStyle} />;
    default:
      return <i>no {`"${type}"`} of status icon</i>;
  }
};

// also export in Component
export const IconStatus: React.FC<{ type: Type } & BaseIconProps> = props => {
  const { type, ...rest } = props;
  return getStatusIcon(type, rest);
};
