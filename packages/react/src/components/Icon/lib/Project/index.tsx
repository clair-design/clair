import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Project } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconProject = getStyleMergedComponent<IconProps>({
  template: Project
})(IconContainer);
