import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { SkipForward } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconSkipForward = getStyleMergedComponent<IconProps>({
  template: SkipForward
})(IconContainer);
