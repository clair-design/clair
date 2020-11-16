import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Upload } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconUpload = getStyleMergedComponent<IconProps>({
  template: Upload
})(IconContainer);
