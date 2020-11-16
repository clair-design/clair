import React, { useEffect, useRef, useState, KeyboardEvent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { TabNavBarUnderline } from "@components/Tabs/lib/TabNavBarUnderline";
import { TabBar } from "@components/Tabs/lib/TabBar";
import { TabsContext } from "@components/Tabs/lib/TabsContext";
import { TabPaneContext } from "@components/Tabs/lib/TabPaneContext";
import {
  PTabPosition,
  TabPaneProps,
  TabsProps
} from "@components/Tabs/lib/types";
import { useActiveKey } from "@components/Tabs/lib/hooks/useActiveKey";
import { useTabKeys } from "@components/Tabs/lib/hooks/useTabKeys";

export const Tabs: React.FC<TabsProps> = props => {
  const {
    children,
    tabPosition = "top",
    type,
    addable,
    onAdd,
    onTabClick
  } = props;

  const isCard = type === "card";
  const tabsClassNames = classNames("c-tabs", {
    [`c-tabs--${tabPosition}`]: !isCard,
    "c-tabs--card": isCard
  });
  const isHorizontal = ["top", "bottom"].indexOf(tabPosition) > -1;
  const [currentActiveKey, setCurrentActiveKey] = useActiveKey(props);
  // use `Symbol()` for initial value
  // won't match with any TabPane's `tabKey`
  // which would also prevent collision with empty string
  const [focusedKey, setFocusedKey] = useState<string | symbol>(Symbol());
  const [tabKeysState, dispatch] = useTabKeys(props);
  // filter out tabs marked bo be swept
  const logicalTabKeysList = tabKeysState.list.filter(Boolean) as NonNullable<
    typeof tabKeysState.list[number]
  >[];
  const selectableTabKeysList = logicalTabKeysList.filter(
    props => !props.disabled
  );
  const currentActiveTabPaneProps = logicalTabKeysList.find(
    tabPaneProps => tabPaneProps.tabKey === currentActiveKey
  );

  // for TabNavBarUnderline
  const [activeTabBarDOM, setActiveTabBarDOM] = useState<HTMLElement | null>(
    null
  );
  const tabBarScrollingTrackRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef(children);
  useEffect(() => {
    if (childrenRef.current !== children) {
      childrenRef.current = children;
      dispatch({
        type: "sweep"
      });
    }
  }, [children, dispatch]);

  // set fallback for activeKey
  useEffect(() => {
    if (!currentActiveKey && logicalTabKeysList?.[0]?.tabKey) {
      setCurrentActiveKey(logicalTabKeysList[0].tabKey);
    }
  }, [currentActiveKey, logicalTabKeysList, setCurrentActiveKey]);

  const updateActiveTab = ({ disabled, tabKey }: TabPaneProps) => {
    if (disabled) {
      return;
    }
    setCurrentActiveKey(tabKey);
    // separate focused and active state
    // for future keyboard interaction
    // in short: focus first, select by Space or Enter later
    setFocusedKey(tabKey);
  };

  const getNextLogicalTabPaneProps = (inc: number): TabPaneProps => {
    const { length } = logicalTabKeysList;
    const activeIndex = logicalTabKeysList.findIndex(
      tabPaneProps => tabPaneProps.tabKey === currentActiveKey
    );
    // compensate for negative values
    const normalizedIndex = (((activeIndex + inc) % length) + length) % length;
    const tabPaneProps = logicalTabKeysList[normalizedIndex];
    // loop over
    if (tabPaneProps.tabKey === currentActiveKey) {
      return tabPaneProps;
    }
    if (tabPaneProps.disabled) {
      return getNextLogicalTabPaneProps(inc + inc);
    }
    return tabPaneProps;
  };
  type T = TabPaneProps;
  const getTabSelectHandler = (p: T) => (e?: React.SyntheticEvent) => {
    const isSelectable = !p.disabled && currentActiveKey !== p.tabKey;
    if (!isSelectable) {
      return;
    }
    updateActiveTab(p);
    onTabClick?.({
      detail: {
        key: p.tabKey
      },
      nativeEvent: e?.nativeEvent
    });
  };

  const getCloseHandler = (props: TabPaneProps) => () => {
    if (!props.closeable) {
      return;
    }
    if (props.tabKey === currentActiveKey) {
      const nextActiveTabPane = getNextLogicalTabPaneProps(1);
      setCurrentActiveKey(nextActiveTabPane.tabKey);
    }
    // onClose is encapsulated in dispatch
    dispatch({
      type: "remove",
      props
    });
  };

  // a11y
  const handleKeydown = (event: KeyboardEvent) => {
    const { key } = event;
    switch (key) {
      case "ArrowRight":
      case "ArrowDown":
        updateActiveTab(getNextLogicalTabPaneProps(1));
        break;
      case "ArrowLeft":
      case "ArrowUp":
        updateActiveTab(getNextLogicalTabPaneProps(-1));
        break;
      case "Home":
        updateActiveTab(selectableTabKeysList[0]);
        break;
      case "End":
        updateActiveTab(
          selectableTabKeysList[selectableTabKeysList.length - 1]
        );
        break;
      case "Backspace":
      case "Delete":
        // close
        if (currentActiveTabPaneProps) {
          getCloseHandler(currentActiveTabPaneProps)();
        }
        break;
      case " ":
      case "Enter":
        // ignore for now
        // since the current focused tab is already `active`
        break;
      default:
        return;
    }
    event.preventDefault();
  };

  const renderTabBar = () => {
    return logicalTabKeysList.map((tabPaneProps, index) => {
      return (
        <TabBar
          key={index}
          index={index}
          onClick={getTabSelectHandler(tabPaneProps)}
          onClose={getCloseHandler(tabPaneProps)}
          isCard={isCard}
          setActiveTabBarDOM={setActiveTabBarDOM}
          {...tabPaneProps}
        />
      );
    });
  };

  const renderPanes = () => {
    const panes = React.Children.toArray(children);
    return panes.map((pane, index) => {
      return (
        <TabPaneContext.Provider key={index} value={{ index }}>
          {pane}
        </TabPaneContext.Provider>
      );
    });
  };

  return (
    <TabsContext.Provider
      value={{
        activeKey: currentActiveKey,
        focusedKey,
        updateTabKeys: dispatch,
        tabPaneProps: logicalTabKeysList
      }}
    >
      <div className={tabsClassNames}>
        <div className="c-tabs__nav-container">
          <div className="c-tabs__nav-list">
            <div
              className="c-tabs__nav"
              role="tablist"
              tabIndex={-1}
              ref={tabBarScrollingTrackRef}
              onKeyDown={handleKeydown}
            >
              {renderTabBar()}
            </div>
            {addable && (
              <div className="add-btn-container">
                <button
                  onClick={() => {
                    onAdd?.();
                  }}
                />
              </div>
            )}
            {!isCard && (
              <TabNavBarUnderline
                tabBarScrollingTrackRef={tabBarScrollingTrackRef}
                activeTabBarDOM={activeTabBarDOM}
                isHorizontal={isHorizontal}
              />
            )}
          </div>
        </div>
        <div className="c-tabs__pane-container">{renderPanes()}</div>
      </div>
    </TabsContext.Provider>
  );
};

Tabs.propTypes = {
  children: PropTypes.node.isRequired,
  defaultActiveKey: PropTypes.string,
  activeKey: PropTypes.string,
  tabPosition: PTabPosition,
  type: PropTypes.oneOf([undefined, "card"]),
  addable: PropTypes.bool,
  onChange: PropTypes.func,
  onTabClick: PropTypes.func,
  onClose: PropTypes.func,
  onAdd: PropTypes.func
};

Tabs.displayName = "Tabs";
