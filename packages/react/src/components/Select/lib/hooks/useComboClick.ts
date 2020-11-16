import { useVisibility } from "@components/Tooltip/lib/hooks/tooltip";
import { TooltipCoreProps } from "@components/Tooltip/lib/types/tooltip";
import { HIDE_DELAY, SHOW_DELAY } from "../constant";
type OnVisibilityChange = TooltipCoreProps["onVisibilityChange"];
type SetIsOpen = (isOpen: boolean) => any;

// TooltipCore attach event listener to the native trigger DOM directly,
// while react event system is using delegation
// on root (or mount element in the future).
// The above means that it is impossible to prevent triggering
// visibility change on TooltipCore
// if we try to stop propagation using react event system
// since the it is always one step behind
// bubbling diagram: target -> root/mount element
// Using capture is not working either.
// The solution is to separate click and other trigger.
// Always use react event system to handle click,
// and thus gain the control of preventing triggering visibility change
export function useComboboxClick(isOpen: boolean, setIsOpen: SetIsOpen) {
  const onTriggerClick: OnVisibilityChange = param => {
    const {
      detail: { visible, source }
    } = param;
    if (source === "click") {
      return setIsOpen(visible);
    }
  };
  const [, toggleVisibility] = useVisibility({
    visible: isOpen,
    showDelay: SHOW_DELAY,
    hideDelay: HIDE_DELAY,
    onVisibilityChange: onTriggerClick
  });
  return () => toggleVisibility("click");
}
