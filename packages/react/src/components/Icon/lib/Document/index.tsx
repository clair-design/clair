import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Document } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconDocument = getStyleMergedComponent<IconProps>({
  template: Document
})(IconContainer);
