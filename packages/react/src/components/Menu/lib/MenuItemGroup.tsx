import React, { useContext } from "react";
import { MenuItemGroupProps, MenuItemGroupPropTypes } from "./util/types";
import { getPaddingByLevel } from "./util/util";
import { SubMenuContext } from "./SubMenu";
import { MenuContext } from "./Menu";

export const MenuItemGroup: React.FC<MenuItemGroupProps> = props => {
  const { isVerticalAndNotCollapsed } = useContext(MenuContext);
  const { level } = useContext(SubMenuContext);

  const { title, children } = props;

  return (
    <div className="c-menu-item-group">
      <div
        className="c-menu-item-group__title"
        style={isVerticalAndNotCollapsed ? getPaddingByLevel(level) : {}}
      >
        {title}
      </div>
      <div className="c-menu-item-group__list">{children}</div>
    </div>
  );
};

MenuItemGroup.propTypes = MenuItemGroupPropTypes;
