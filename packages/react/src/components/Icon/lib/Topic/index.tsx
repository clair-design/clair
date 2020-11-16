import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Topic } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconTopic = getStyleMergedComponent<IconProps>({
  template: Topic
})(IconContainer);
