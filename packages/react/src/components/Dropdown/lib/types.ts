import {
  ReactElement,
  HTMLAttributes,
  CSSProperties,
  RefAttributes,
  Component,
  MouseEvent
} from "react";
import PropTypes from "prop-types";

export const placements = [
  "bottom",
  "bottom-left",
  "bottom-right",
  "top",
  "top-left",
  "top-right"
] as const;

export const triggerTypes = ["hover", "click", "focus"] as const;

export const DPlacement = PropTypes.oneOf([...placements]);
export const DTriggerType = PropTypes.arrayOf(
  PropTypes.oneOf([...triggerTypes])
);

export type Placement = typeof placements[number];
export type Trigger = typeof triggerTypes[number];
export type TriggerType = Array<Trigger>;

export const [DEFAULT_PLACEMENT] = placements;
export const DEFAULT_TRIGGER: TriggerType = [triggerTypes[0]];
export const DEFAULT_DELAY: number = 100;
export const DEFAULT_TABINDEX: number = 0;
export const DEFAULT_HIDEONCLICK: boolean = false;

export const KEY_CODE_VALUE = {
  ENTER: "Enter",
  SPACE: " ",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ESCAPE: "Escape",
  HOME: "Home",
  END: "End"
};

export interface DefaultDropdownProps {
  placement: Placement;
  trigger: TriggerType;
  showDelay: number;
  hideDelay: number;
  tabindex: number;
}

export type TriggerProps = HTMLAttributes<HTMLSpanElement> &
  RefAttributes<HTMLSpanElement>;

export type overlayFunc = () => Element;

export interface DropdownProps {
  placement?: Placement;
  overlay?: ReactElement | overlayFunc;
  trigger?: TriggerType;
  visible?: boolean;
  defaultVisible?: boolean;
  showDelay?: number;
  hideDelay?: number;
  className?: string;
  style?: CSSProperties;
  tabindex?: number;
  onVisibilityChange?(option: CCustomEvent<{ visible: boolean }>): void;
}

export interface DropdownState {
  selfVisible: boolean;
  mountNode: HTMLElement | null;
  focusedIndex: number | null;
  menuStyle: CSSProperties;
  menuPlacement: Placement;
}

export interface DropdownItemContextType {
  handleItemClick?(e: MouseEvent<HTMLLIElement>, key?: ItemKey): void;
  index?: number;
  focusedIndex?: number | null;
}

export interface DropdownMenuContextType {
  menuRef?: (r: HTMLMenuElement) => void;
  menuStyle?: CSSProperties;
  menuPlacement?: Placement;
  hideDropdown?(): void;
  hideDropdownAndFocusTrigger?(): void;
  focusedIndex?: number | null;
  focusItem?(focusedIndex: number | null): void;
}

export interface DropdownMenuProps {
  onClick?(
    option: CCustomEvent<{ key?: ItemKey }, MouseEvent<HTMLLIElement>>
  ): void;
  ref?(r: Component): void;
  hideOnClick?: boolean;
}

export interface DefaultDropdownMenuProps {
  hideOnClick: boolean;
}

export const itemKeyTypes = ["string", "number", "object"];
export const DItemKey = PropTypes.oneOfType([
  PropTypes.string,
  PropTypes.number,
  PropTypes.object
]);

export type ItemKey = string | number | object;

export interface DropdownItemProps {
  disabled?: boolean;
  divided?: boolean;
  itemKey?: ItemKey;
}
