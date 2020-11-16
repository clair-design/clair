import React, { FC, RefObject, useEffect, useState } from "react";
import PropTypes, { ValidationMap } from "prop-types";
import { createError } from "@src/utils";

interface TabNavBarUnderlineProps {
  activeTabBarDOM: HTMLElement | null;
  isHorizontal: boolean;
  tabBarScrollingTrackRef: RefObject<HTMLElement>;
}

export const TabNavBarUnderline: FC<TabNavBarUnderlineProps> = props => {
  const { isHorizontal, activeTabBarDOM, tabBarScrollingTrackRef } = props;
  // TabBar Style
  const [navBarStyle, setNavBarStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    if (!activeTabBarDOM || !tabBarScrollingTrackRef.current) {
      return;
    }
    if (isHorizontal) {
      setNavBarStyle({
        left: 0,
        width: `${activeTabBarDOM.offsetWidth}px`,
        transform: `translateX(${
          activeTabBarDOM.offsetLeft -
          tabBarScrollingTrackRef.current.scrollLeft
        }px)`
      });
    } else {
      setNavBarStyle({
        top: 0,
        height: `${activeTabBarDOM.offsetHeight}px`,
        transform: `translateY(${
          activeTabBarDOM.offsetTop - tabBarScrollingTrackRef.current.scrollTop
        }px)`
      });
    }
  }, [activeTabBarDOM, isHorizontal, tabBarScrollingTrackRef]);

  return <div className="c-tabs__nav-bar" style={navBarStyle} />;
};

TabNavBarUnderline.propTypes = {
  isHorizontal: PropTypes.bool.isRequired,
  activeTabBarDOM: (props, propName) => {
    const value = props[propName];
    if (value === null) {
      return;
    }
    if (value instanceof Element) {
      return;
    }
    return createError(
      "INVALID PROPS",
      `${propName} should be Element or null, but get ${typeof value}`
    );
  },
  tabBarScrollingTrackRef: PropTypes.shape({
    current: PropTypes.any
  }).isRequired
} as ValidationMap<TabNavBarUnderlineProps>;

TabNavBarUnderline.displayName = "TabNavBarUnderline";
