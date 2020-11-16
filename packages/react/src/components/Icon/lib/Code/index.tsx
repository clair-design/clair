import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Code } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCode = getStyleMergedComponent<IconProps>({
  template: Code
})(IconContainer);
