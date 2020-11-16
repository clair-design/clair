import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Drawing } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDrawing = getStyleMergedComponent<IconProps>({
  template: Drawing
})(IconContainer);
