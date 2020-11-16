import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Template } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTemplate = getStyleMergedComponent<IconProps>({
  template: Template
})(IconContainer);
