import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { PoliceLight } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPoliceLight = getStyleMergedComponent<IconProps>({
  template: PoliceLight
})(IconContainer);
