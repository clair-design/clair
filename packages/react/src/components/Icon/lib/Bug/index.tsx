import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Bug } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBug = getStyleMergedComponent<IconProps>({
  template: Bug
})(IconContainer);
