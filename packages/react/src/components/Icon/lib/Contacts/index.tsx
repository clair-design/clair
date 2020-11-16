import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Contacts } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconContacts = getStyleMergedComponent<IconProps>({
  template: Contacts
})(IconContainer);
