import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Printer } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconPrinter = getStyleMergedComponent<IconProps>({
  template: Printer
})(IconContainer);
