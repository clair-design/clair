import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Briefcase } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconBriefcase = getStyleMergedComponent<IconProps>({
  template: Briefcase
})(IconContainer);
