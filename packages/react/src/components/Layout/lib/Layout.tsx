import classNames from "classnames";
import React, {
  FC,
  ReactNode,
  HTMLAttributes,
  useContext,
  ReactElement,
  isValidElement,
  useRef
} from "react";
import PropTypes from "prop-types";
import { Aside } from "./Aside";
import { Header } from "./Header";

export type LayoutProps = HTMLAttributes<HTMLDivElement>;

export interface LayoutContextProps {
  isScrollMain?: boolean;
  isDefault?: boolean;
}

const { toArray } = React.Children;

const getChildrenOfType = (children: ReactNode, type: FC): ReactElement[] => {
  if (!children) return [];
  return toArray(children).filter(child => {
    if (!isValidElement(child)) return false;
    return (child as ReactElement).type === type;
  }) as ReactElement[];
};

const hasChildOfType = (children: ReactNode, type: FC) => {
  return getChildrenOfType(children, type).length > 0;
};

const LayoutContext = React.createContext<LayoutContextProps>({
  isDefault: true
});

const Layout: FC<LayoutProps> = (props: LayoutProps) => {
  const { className, children, ...rest } = props;

  const layouts = getChildrenOfType(children, Layout);
  const layoutChildren = layouts.map(layout => layout.props.children);
  const allChildren = toArray(children).concat(...layoutChildren.map(toArray));
  const asides = getChildrenOfType(allChildren, Aside);
  const headers = getChildrenOfType(allChildren, Header);

  const parentContext = useContext(LayoutContext);
  const selfContext = useRef({ isScrollMain: false });
  const context = parentContext.isDefault ? selfContext.current : parentContext;

  const hasAside = hasChildOfType(children, Aside);
  const hasFixedAside = asides.some(aside => aside.props.fixed);
  const hasFixedHeader = headers.some(header => header.props.fixed);

  // make main content scrolling if header and aside are fixed
  const isScrollMain = hasFixedAside && hasFixedHeader;
  selfContext.current.isScrollMain = isScrollMain;

  const blockName = "c-layout";
  const cls = classNames(blockName, className, {
    [`${blockName}--has-aside`]: hasAside,
    [`${blockName}--scroll-main`]: isScrollMain
  });

  return (
    <LayoutContext.Provider value={context}>
      <div className={cls} {...rest}>
        {children}
      </div>
    </LayoutContext.Provider>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  style: PropTypes.object
};

Layout.displayName = "Layout";

export { Layout, LayoutContext };
