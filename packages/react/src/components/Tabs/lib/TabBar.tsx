import React, {
  Dispatch,
  FC,
  SetStateAction,
  SyntheticEvent,
  useContext,
  useEffect,
  useRef
} from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { IconClose } from "@components/Icon";
import { TabsContext } from "@components/Tabs/lib/TabsContext";
import { TabPaneProps, TabPanePropTypes } from "@components/Tabs/lib/types";

interface TabBarProps extends TabPaneProps {
  index: number;
  onClick: (e?: SyntheticEvent) => void;
  onClose: (e?: SyntheticEvent) => void;
  isCard: boolean;
  setActiveTabBarDOM: Dispatch<SetStateAction<HTMLElement | null>>;
}

export const TabBar: FC<TabBarProps> = props => {
  const {
    label,
    closeable,
    disabled,
    tabKey,
    index,
    onClick: onSelect,
    onClose,
    isCard,
    setActiveTabBarDOM
  } = props;
  const ref = useRef<HTMLDivElement>(null);
  const { activeKey, focusedKey } = useContext(TabsContext);
  // active is the `selected` state
  // focused is whether the tabBar has the focus
  // focused !== active(selected)
  const isActive = tabKey === activeKey;
  const isFocused = tabKey === focusedKey;
  useEffect(() => {
    if (isActive) {
      setActiveTabBarDOM(ref.current);
    }
  }, [isActive, setActiveTabBarDOM]);
  useEffect(() => {
    if (isFocused) {
      // maybe prevent scroll?
      ref.current?.focus?.();
    }
  }, [isFocused]);
  const className = classNames("c-tabs__item", {
    "c-tabs__item-active": isActive,
    "c-tabs__item-disabled": disabled,
    "c-tabs__item--closable": closeable
  });
  return (
    // all keyboard events is handled in `Tabs.tsx`
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      ref={ref}
      className={className}
      id={`tab-${index}`}
      role="tab"
      aria-selected={isActive}
      aria-disabled={disabled}
      aria-controls={`panel-${index}`}
      tabIndex={isActive ? 0 : -1}
      onClick={onSelect}
    >
      {label}
      {closeable && isCard && (
        <IconClose
          tabIndex={-1}
          className="c-icon--close-tab"
          role="button"
          aria-label="关闭"
          onClick={event => {
            event.stopPropagation();
            onClose(event);
          }}
        />
      )}
    </div>
  );
};

TabBar.propTypes = {
  index: PropTypes.number.isRequired,
  isCard: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  ...TabPanePropTypes
};

TabBar.displayName = "TabBar";
