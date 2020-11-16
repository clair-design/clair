import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Calendar } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCalendar = getStyleMergedComponent<IconProps>({
  template: Calendar
})(IconContainer);
