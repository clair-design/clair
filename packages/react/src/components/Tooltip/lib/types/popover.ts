import React from "react";
import { Placement } from "@components/Tooltip/lib/types/tooltip";

export interface PopOverProps extends React.HTMLAttributes<HTMLDivElement> {
  visible: boolean;
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  ref: React.Ref<HTMLDivElement>;
  placement?: Placement;
  role?: string;
  showDelay: number;
  appendTarget?: HTMLElement;
}

export interface Pos {
  left: number;
  top: number;
  bottom?: number;
  right?: number;
}

export type PosAndPlacement = Pos & {
  placement: Placement;
};
