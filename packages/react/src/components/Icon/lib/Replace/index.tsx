import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Replace } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconReplace = getStyleMergedComponent<IconProps>({
  template: Replace
})(IconContainer);
