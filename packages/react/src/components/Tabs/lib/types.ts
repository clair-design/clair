import React from "react";
import PropTypes from "prop-types";

const positions = ["top", "right", "bottom", "left"] as const;
export type TabPosition = typeof positions[number];
export const PTabPosition = PropTypes.oneOf([...positions]);
export type TabChangeEvent = CCustomEvent<{ key: string }>;
type EventHandler = (e: TabChangeEvent) => void;

export interface TabsProps {
  children: React.ReactNode;
  defaultActiveKey?: string;
  activeKey?: string;
  tabPosition?: TabPosition;
  type?: "card";
  addable?: boolean;
  onChange?: EventHandler;
  onTabClick?: EventHandler;
  onClose?: EventHandler;
  onAdd?: Function;
}

export interface TabPaneProps {
  tabKey: string;
  children?: React.ReactNode;
  label: React.ReactNode;
  closeable?: boolean;
  disabled?: boolean;
  lazy?: boolean;
}

export const TabPanePropTypes = {
  tabKey: PropTypes.string.isRequired,
  children: PropTypes.node,
  label: PropTypes.node.isRequired,
  closeable: PropTypes.bool,
  disabled: PropTypes.bool,
  lazy: PropTypes.bool
};
