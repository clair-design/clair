import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Database } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDatabase = getStyleMergedComponent<IconProps>({
  template: Database
})(IconContainer);
