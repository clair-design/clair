import React from "react";
import { IconContainer, IconProps, IconPropTypes } from "../Container";
import { Question, QuestionCircleFill, QuestionCircle } from "@clair/icons";
import { IconLineAndDot } from "../IconLineAndDot";
import { getStyleMergedComponent } from "@src/utils";

export const IconQuestion: React.FC<IconProps> = props => {
  return <IconLineAndDot {...props} template={Question} />;
};

IconQuestion.propTypes = IconPropTypes;
IconQuestion.displayName = "IconQuestion";

export const IconQuestionCircleFill = getStyleMergedComponent<IconProps>({
  template: QuestionCircleFill,
  className: "c-icon--fill"
})(IconContainer);

export const IconQuestionCircle = getStyleMergedComponent<IconProps>({
  template: QuestionCircle
})(IconContainer);
