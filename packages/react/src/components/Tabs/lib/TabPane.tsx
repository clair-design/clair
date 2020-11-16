import React, { useContext, useEffect, useRef } from "react";
import { TabsContext } from "@components/Tabs/lib/TabsContext";
import { TabPaneContext } from "@components/Tabs/lib/TabPaneContext";
import { TabPaneProps, TabPanePropTypes } from "@components/Tabs/lib/types";

export const TabPane: React.FC<TabPaneProps> = props => {
  const { children, lazy, tabKey } = props;
  const { updateTabKeys, activeKey } = useContext(TabsContext);
  const { index } = useContext(TabPaneContext);
  const renderedRef = useRef(false);

  useEffect(() => {
    updateTabKeys({
      type: "update",
      index,
      props
    });
    // trigger mark-sweep mechanism
    return () =>
      updateTabKeys({
        type: "mark",
        index
      });
  }, [index, props, updateTabKeys]);

  const isActive = activeKey === tabKey;
  // track whether has been rendered
  useEffect(() => {
    if (isActive) {
      renderedRef.current = true;
    }
  }, [isActive]);
  const hasBeenRendered = renderedRef.current;
  if (lazy && !isActive && !hasBeenRendered) {
    return null;
  }

  return (
    <div
      className="c-tab-pane"
      hidden={!isActive}
      id={`panel-${index}`}
      role="tabpanel"
      aria-labelledby={`tab-${index}`}
    >
      {children}
    </div>
  );
};

TabPane.propTypes = TabPanePropTypes;

TabPane.displayName = "TabPane";
