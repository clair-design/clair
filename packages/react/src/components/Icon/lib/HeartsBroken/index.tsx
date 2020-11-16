import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { HeartsBroken } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconHeartsBroken = getStyleMergedComponent<IconProps>({
  template: HeartsBroken
})(IconContainer);
