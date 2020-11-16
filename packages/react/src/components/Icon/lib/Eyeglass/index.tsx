import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Eyeglass } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconEyeglass = getStyleMergedComponent<IconProps>({
  template: Eyeglass
})(IconContainer);
