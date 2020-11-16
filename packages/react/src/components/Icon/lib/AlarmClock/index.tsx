import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { AlarmClock } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconAlarmClock = getStyleMergedComponent<IconProps>({
  template: AlarmClock
})(IconContainer);
