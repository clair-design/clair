import classNames from "classnames";
import PropTypes from "prop-types";
import React, {
  FC,
  HTMLAttributes,
  ReactNode,
  useContext,
  useState,
  useEffect
} from "react";
import { IconMenuFold, IconMenuUnfold } from "@components/Icon";

import { LayoutContext } from "./Layout";

export interface AsideProps extends HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  collapsedWidth?: string | number;
  collapsible?: boolean;
  fixed?: boolean;
  onCollapse?: (event: CCustomEvent<{ collapsed: boolean }>) => {};
  trigger?: ReactNode;
  width?: string | number;
}

const DEFAULT_WIDTH = 200;
const DEFAULT_COLLAPSED_WIDTH = 60;

const Aside: FC<AsideProps> = (props: AsideProps) => {
  const {
    children,
    className,
    collapsed: collapsedProp,
    collapsible = false,
    onCollapse,
    fixed = false,
    style,
    trigger,
    width = DEFAULT_WIDTH,
    collapsedWidth = DEFAULT_COLLAPSED_WIDTH,
    ...rest
  } = props;

  const [collapsed, setCollapsed] = useState(collapsedProp);
  useEffect(() => {
    setCollapsed(collapsedProp);
  }, [collapsedProp]);

  const { isScrollMain } = useContext(LayoutContext);

  const blockName = "c-layout__aside";
  const cls = classNames(blockName, className, {
    [`${blockName}--collapsed`]: collapsible && collapsed,
    [`${blockName}--sticky`]: fixed && !isScrollMain,
    [`${blockName}--has-trigger`]: collapsible && trigger !== null
  });

  const styles = {
    width: collapsible && collapsed ? collapsedWidth : width,
    ...style
  };

  const toggle = () => {
    setCollapsed(!collapsed);
    if (typeof onCollapse === "function") {
      onCollapse({ detail: { collapsed: !collapsed } });
    }
  };
  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") toggle();
  };

  const TriggerIcon = collapsed ? IconMenuUnfold : IconMenuFold;
  const defaultTrigger = <TriggerIcon className="c-layout__trigger-icon" />;
  const collapseTrigger = (
    <div
      className="c-layout__collapse-trigger"
      onClick={toggle}
      onKeyUp={onKeyUp}
      role="button"
      tabIndex={0}
    >
      {trigger === undefined ? defaultTrigger : trigger}
    </div>
  );
  const shouldShowTrigger = collapsible && trigger !== null;

  return (
    <aside className={cls} style={styles} {...rest}>
      {children}
      {shouldShowTrigger ? collapseTrigger : null}
    </aside>
  );
};

Aside.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  collapsed: PropTypes.bool,
  collapsedWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  collapsible: PropTypes.bool,
  onCollapse: PropTypes.func,
  style: PropTypes.object,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

Aside.displayName = "Aside";

export { Aside };
