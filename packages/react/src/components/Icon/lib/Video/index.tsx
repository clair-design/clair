import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Video } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconVideo = getStyleMergedComponent<IconProps>({
  template: Video
})(IconContainer);
