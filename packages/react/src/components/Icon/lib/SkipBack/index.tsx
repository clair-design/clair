import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { SkipBack } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSkipBack = getStyleMergedComponent<IconProps>({
  template: SkipBack
})(IconContainer);
