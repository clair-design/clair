import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Layer } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLayer = getStyleMergedComponent<IconProps>({
  template: Layer
})(IconContainer);
