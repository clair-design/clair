import { TooltipCoreProps } from "@components/Tooltip/lib/types/tooltip";

type OnVisibilityChange = TooltipCoreProps["onVisibilityChange"];
type SetIsOpen = (isOpen: boolean) => any;

// SEE useComboClick.ts for why this exists
export function useNonClickVisChange(setIsOpen: SetIsOpen) {
  const onNonClick: OnVisibilityChange = param => {
    const {
      detail: { visible, source }
    } = param;
    if (source === "click") {
      return;
    }
    setIsOpen(visible);
  };
  return onNonClick;
}
