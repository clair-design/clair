import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Overview } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconOverview = getStyleMergedComponent<IconProps>({
  template: Overview
})(IconContainer);
