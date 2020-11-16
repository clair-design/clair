import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { PPT } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPPT = getStyleMergedComponent<IconProps>({
  template: PPT
})(IconContainer);
