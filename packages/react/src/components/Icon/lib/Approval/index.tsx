import { IconContainer, IconProps } from "@components/Icon/lib/Container";
import { Approval } from "@clair/icons";
import { getStyleMergedComponent } from "@src/utils";

export const IconApproval = getStyleMergedComponent<IconProps>({
  template: Approval
})(IconContainer);
