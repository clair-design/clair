import { useEffect, useState } from "react";
import { zIndexManager } from "@clair/helpers";

export interface UseZIndexOption {
  visible?: boolean;
  trigger?: number;
}

// update zIndex when
// 1. the component is visible
// 2. or manually update by trigger (using Date.now())
// the second one is used for cases where multiple "popping" components could be visible at the same time
// and the zIndex is managed by their shared containing Element
// like notification
export const useZIndex = (option: UseZIndexOption = {}) => {
  const { visible = true, trigger = 0 } = option;
  const [zIndex, updateZIndex] = useState(Number(zIndexManager.next()));
  useEffect(() => {
    if (visible) {
      updateZIndex(Number(zIndexManager.next()));
    }
  }, [visible, trigger]);
  return zIndex;
};
