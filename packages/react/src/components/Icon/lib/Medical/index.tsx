import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Medical } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconMedical = getStyleMergedComponent<IconProps>({
  template: Medical
})(IconContainer);
