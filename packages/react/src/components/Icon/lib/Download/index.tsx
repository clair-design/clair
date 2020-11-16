import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Download } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDownload = getStyleMergedComponent<IconProps>({
  template: Download
})(IconContainer);
