import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Server } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconServer = getStyleMergedComponent<IconProps>({
  template: Server
})(IconContainer);
