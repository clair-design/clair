import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Film } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconFilm = getStyleMergedComponent<IconProps>({
  template: Film
})(IconContainer);
