import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Standard } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconStandard = getStyleMergedComponent<IconProps>({
  template: Standard
})(IconContainer);
