import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Copy } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconCopy = getStyleMergedComponent<IconProps>({
  template: Copy
})(IconContainer);
