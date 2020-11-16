import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Polymerization } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPolymerization = getStyleMergedComponent<IconProps>({
  template: Polymerization
})(IconContainer);
