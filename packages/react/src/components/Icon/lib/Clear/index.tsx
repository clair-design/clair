import { IconClose } from "../Close";
import { getStyleMergedComponent } from "@src/utils";

export const IconClear = getStyleMergedComponent({
  className: "c-icon--svg-circle c-icon--svg-light",
  style: {
    background: "#6e6e6e"
  }
})(IconClose);

IconClear.displayName = "IconClear";
