import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { QRcode } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconQRcode = getStyleMergedComponent<IconProps>({
  template: QRcode
})(IconContainer);
