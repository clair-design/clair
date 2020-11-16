import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Leaderboard } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconLeaderboard = getStyleMergedComponent<IconProps>({
  template: Leaderboard
})(IconContainer);
