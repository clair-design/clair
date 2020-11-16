import React, {
  Component,
  ReactNode,
  CSSProperties,
  ReactElement,
  isValidElement,
  ReactPortal,
  cloneElement,
  Children
} from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import classNames from "classnames";
import { throttle } from "lodash-es";
import { calcPopoverPosition, zIndexManager } from "@clair/helpers";
import { DropdownMenu } from "./DropdownMenu";
import { DropdownItem } from "./DropdownItem";
import { DropdownMenuContext } from "./context";
import {
  KEY_CODE_VALUE,
  DPlacement,
  DTriggerType,
  DEFAULT_PLACEMENT,
  DEFAULT_TRIGGER,
  DEFAULT_TABINDEX,
  DEFAULT_DELAY,
  DefaultDropdownProps,
  TriggerProps,
  DropdownProps,
  DropdownState
} from "./types";

export class Dropdown extends Component<DropdownProps, DropdownState> {
  public static propTypes: PropTypes.InferProps<DropdownProps> = {
    placement: DPlacement,
    overlay: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    trigger: DTriggerType,
    visible: PropTypes.bool,
    defaultVisible: PropTypes.bool,
    showDelay: PropTypes.number,
    hideDelay: PropTypes.number,
    tabindex: PropTypes.number,
    onVisibilityChange: PropTypes.func,
    className: PropTypes.string,
    style: PropTypes.object as PropTypes.InferType<DropdownProps["style"]>
  };
  public static defaultProps: DefaultDropdownProps = {
    placement: DEFAULT_PLACEMENT,
    trigger: DEFAULT_TRIGGER,
    showDelay: DEFAULT_DELAY,
    hideDelay: DEFAULT_DELAY,
    tabindex: DEFAULT_TABINDEX
  };
  public static displayName: "Dropdown";
  public static Item = DropdownItem;
  public static Menu = DropdownMenu;

  private timer: number | null = null;
  private triggerElm: HTMLSpanElement | null = null;
  private dropdownElm: DropdownMenu | null = null;
  private dropdownMenuElm: HTMLMenuElement | null = null;

  public state: DropdownState = {
    selfVisible: this.initialVisible,
    mountNode: null,
    focusedIndex: null,
    menuStyle: {},
    menuPlacement: DEFAULT_PLACEMENT
  };

  private get isControlled(): boolean {
    // 当前组件显示状态是否由外部组件控制
    const { visible } = this.props;
    return typeof visible === "boolean";
  }

  private get initialVisible(): boolean {
    // 当前组件显示状态是否由外部组件控制
    const { visible, defaultVisible } = this.props;
    let selfVisible = false;
    if (this.isControlled) {
      selfVisible = visible as boolean;
    } else if (typeof defaultVisible === "boolean") {
      selfVisible = defaultVisible;
    }
    return selfVisible;
  }

  private get focusableLength(): number {
    // 当前组件显示状态是否由外部组件控制
    if (this.dropdownElm) {
      const { children } = this.dropdownElm.props;
      if (children) {
        const focusableList = Children.map(children, e => {
          if (
            isValidElement(e) &&
            e.type === DropdownItem &&
            !e.props.disabled
          ) {
            return e;
          }
        });
        if (focusableList) {
          return focusableList.length;
        }
      }
    }
    return 0;
  }

  private get show(): boolean {
    // 判断当前下拉菜单是否显示
    const { visible } = this.props;
    const { selfVisible } = this.state;
    return this.isControlled ? (visible as boolean) : selfVisible;
  }

  private get triggerProps(): TriggerProps {
    // 绑定Trigger的事件和ref
    const { trigger } = this.props;
    const triggerProps: TriggerProps = {};
    const triggerArr = Array.isArray(trigger) ? trigger : DEFAULT_TRIGGER;

    if (triggerArr.includes("hover")) {
      triggerProps.onMouseEnter = this.showDropdown;
      triggerProps.onMouseLeave = this.hideDropdown;
    }
    if (triggerArr.includes("click")) {
      triggerProps.onClick = this.handleClick;
    }
    if (triggerArr.includes("focus")) {
      triggerProps.onFocus = () => {
        this.showDropdown();
        this.addKeyboardEvent();
      };
      triggerProps.onBlur = () => {
        this.hideDropdown();
        this.rmKeyboardEvent();
      };
    } else {
      triggerProps.onFocus = this.addKeyboardEvent;
      triggerProps.onBlur = this.rmKeyboardEvent;
    }

    triggerProps.ref = (r: HTMLSpanElement) => {
      this.triggerElm = r;
    };

    if (this.show) {
      triggerProps["aria-expanded"] = "true";
    }
    return triggerProps;
  }

  public componentDidUpdate(
    prevProps: DropdownProps,
    prevState: DropdownState
  ) {
    const { visible } = this.props;
    const { selfVisible } = this.state;
    const propsToggle: boolean = prevProps.visible !== visible;
    const stateToggle: boolean = prevState.selfVisible !== selfVisible;
    if (propsToggle || stateToggle) {
      // 下拉菜单显示状态变化时 存在副作用
      if (!this.show) {
        this.setState({ focusedIndex: null });
        // 下拉菜单隐藏后 取消对下拉菜单Item的focus
      }
      this.toggleOverlayEvent(this.show);
      // 下拉菜单显示/隐藏的时候 设置/取消overlay位置变化的相关事件
    }
  }

  public componentDidMount() {
    this.setState(
      {
        mountNode: document.body
      },
      this.updateOverlayPos
    );
    // 组件Mount之后 设置下拉菜单绑定的元素
  }

  public componentWillUnmount() {
    this.toggleOverlayEvent(false);
    // 组件Unmount之后 清除绑定事件
  }

  private setVisible = (selfVisible: boolean, cb?: () => void) => {
    // 组件调用onVisibilityChange通知开发者，非受控时调用setState显示/隐藏下拉菜单
    const { onVisibilityChange } = this.props;
    if (typeof onVisibilityChange === "function") {
      onVisibilityChange({
        detail: { visible: selfVisible }
      });
    }
    if (!this.isControlled) {
      if (typeof cb === "function") {
        this.setState({ selfVisible }, cb);
      } else {
        this.setState({ selfVisible });
      }
    } else if (typeof cb === "function") {
      cb();
    }
  };

  public handleClickOutside = (ev: MouseEvent) => {
    // 点击下拉菜单外的区域 隐藏下拉菜单
    const { trigger } = this.props;
    const target = ev.target as Node;
    const triggerWithClick =
      Array.isArray(trigger) && trigger.includes("click");
    const clickOnDropdown = this.dropdownMenuElm?.contains(target);
    const clickOnTrigger = this.triggerElm?.contains(target);
    // 点击到下拉菜单的时候 允许事件冒泡 可以触发下拉菜单的点击事件
    if (!clickOnDropdown) {
      ev.stopPropagation();
    }
    if (
      !clickOnDropdown && // 没有点击到下拉菜单
      !(triggerWithClick && clickOnTrigger) // 点击触发时 没有点击到下拉菜单块
    ) {
      this.hideDropdown();
    }
  };

  private normalizeDelay = (delay?: number | string) => {
    if (typeof delay === "number" && delay >= 1) {
      return Math.floor(delay);
    } else if (typeof delay === "string" && Number(delay) >= 1) {
      return Math.floor(Number(delay));
    }
    return 0;
  };

  private showDropdown = (
    cb: (() => void) | React.MouseEvent = () => void 0
  ) => {
    const { showDelay } = this.props;
    if (this.timer) clearTimeout(this.timer);
    const showDelaySec: number = this.normalizeDelay(showDelay);
    let callback: () => void = () => void 0;
    if (typeof cb === "function") {
      callback = cb;
    }
    if (showDelaySec <= 0) {
      this.setVisible(true, callback);
    } else {
      this.timer = window.setTimeout(
        () => this.setVisible(true, callback),
        showDelaySec
      );
    }
  };

  private hideDropdown = (
    cb: (() => void) | React.MouseEvent = () => void 0
  ) => {
    const { hideDelay } = this.props;
    if (this.timer) clearTimeout(this.timer);
    const hideDelaySec: number = this.normalizeDelay(hideDelay);
    let callback: () => void = () => void 0;
    if (typeof cb === "function") {
      callback = cb;
    }
    if (hideDelaySec <= 0) {
      this.setVisible(false, callback);
    } else {
      this.timer = window.setTimeout(
        () => this.setVisible(false, callback),
        hideDelaySec
      );
    }
  };

  private showDropdownAndFocusItem = (focusedIndex: number = 0) => {
    // 显示对应的DropdownMenu，并focus第一个或最后一个 DropdownItem
    const focusFunc = () => {
      this.focusItem(focusedIndex);
    };
    this.showDropdown(focusFunc);
  };

  private hideDropdownAndFocusTrigger = () => {
    const { trigger } = this.props;
    if (Array.isArray(trigger) && trigger.includes("focus")) {
      // 通过focus触发下拉时，focus自己
      this.setState({
        focusedIndex: null
      });
      if (this.triggerElm) {
        this.triggerElm.focus({
          preventScroll: true
        });
      }
    } else {
      // 不通过focus触发下拉时，隐藏对应的DropdownMenu，并focus自己
      const focusFunc = () => {
        if (this.triggerElm) {
          this.triggerElm.focus({
            preventScroll: true
          });
        }
      };
      this.hideDropdown(focusFunc);
    }
  };

  private handleKeyDown = (e: KeyboardEvent) => {
    const { key } = e;
    const { ENTER, SPACE, ARROW_DOWN, ARROW_UP } = KEY_CODE_VALUE;
    if ([ENTER, SPACE, ARROW_DOWN].includes(key)) {
      // 按下Enter/Space/Arrow-down则显示DropdownMenu，并focus第一个DropdownItem
      e.preventDefault();
      this.showDropdownAndFocusItem(0);
    } else if (key === ARROW_UP) {
      // 按下Arrow-up则显示DropdownMenu，并focus最后一个DropdownItem
      e.preventDefault();
      this.showDropdownAndFocusItem(-1);
    }
  };

  private addKeyboardEvent = () => {
    if (this.triggerElm) {
      this.triggerElm.addEventListener("keydown", this.handleKeyDown);
    }
  };

  private rmKeyboardEvent = () => {
    if (this.triggerElm) {
      this.triggerElm.removeEventListener("keydown", this.handleKeyDown);
    }
  };

  private handleClick = (ev: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const target = ev.target as Node;
    const clickOnTrigger = this.triggerElm?.contains(target);
    // 只有在点击triggerElm触发器（内）的元素 才触发handleClick
    if (clickOnTrigger) {
      this.setVisible(true);
    }
  };

  private toggleOverlayEvent = (attach: boolean = true) => {
    // 设置或取消下拉菜单位置变化的相关事件（有副作用，纯DOM操作）
    const { trigger } = this.props;
    const updatePos = throttle(this.updateOverlayPos);
    if (!Array.isArray(trigger)) return;
    this.updateOverlayPos();
    if (attach) {
      window.addEventListener("scroll", updatePos);
      window.addEventListener("resize", updatePos);
      if (trigger.includes("click")) {
        document.body.addEventListener("click", this.handleClickOutside);
      }
      if (trigger.includes("hover") && this.dropdownMenuElm) {
        this.dropdownMenuElm.addEventListener("mouseenter", () =>
          this.showDropdown()
        );
        this.dropdownMenuElm.addEventListener("mouseleave", () => {
          this.hideDropdown();
        });
      }
    } else {
      window.removeEventListener("scroll", updatePos);
      window.removeEventListener("resize", updatePos);
      if (trigger.includes("click")) {
        document.body.removeEventListener("click", this.handleClickOutside);
      }
      if (trigger.includes("hover") && this.dropdownMenuElm) {
        this.dropdownMenuElm.removeEventListener("mouseenter", () =>
          this.showDropdown()
        );
        this.dropdownMenuElm.removeEventListener("mouseleave", () =>
          this.hideDropdown()
        );
      }
    }
  };

  private updateOverlayPos = () => {
    // 更新overlay的位置
    const { placement } = this.props;
    if (this.triggerElm && this.dropdownMenuElm && placement) {
      const { top, left } = calcPopoverPosition(
        this.triggerElm,
        this.dropdownMenuElm,
        placement
      );
      const menuStyle: CSSProperties = {
        position: "absolute",
        top: `${top}px`,
        left: `${left}px`,
        zIndex: parseInt(zIndexManager.next())
      };
      this.setState({ menuStyle, menuPlacement: placement });
    }
  };

  private focusItem = (index: number | null) => {
    // 更新当前focus的item
    if (typeof index === "number") {
      const focusedIndex =
        (index + this.focusableLength) % this.focusableLength;
      this.setState({
        focusedIndex
      });
    } else {
      this.setState({
        focusedIndex: null
      });
    }
  };

  public render(): ReactNode {
    const { style, className, children, tabindex, overlay } = this.props;
    const { mountNode, focusedIndex, menuStyle, menuPlacement } = this.state;

    // dropdownWrap 是一个通过 createPortal 生成的组件，在 Dropdown 中直接使用。
    if (!mountNode) {
      return null;
    }

    let DropdownWrap: ReactPortal | null = null;
    if (this.show) {
      let overlayComp: ReactElement | null = null;
      if (isValidElement(overlay)) {
        // overlay是Element的情况
        overlayComp = overlay;
      } else if (typeof overlay === "function") {
        // overlay是返回Element的函数的情况
        const dropEle = overlay();
        if (isValidElement(dropEle)) {
          overlayComp = dropEle;
        }
      }

      if (overlayComp) {
        DropdownWrap = createPortal(
          // 通过context向下传递dropdownMenuElm的Ref给下拉菜单overlayComp的最外层<menu>元素
          // 以及focus相关的序号和方法
          // 通过Props向下传递dropdownElm的Ref给下拉菜单overlayComp
          <DropdownMenuContext.Provider
            value={{
              menuRef: (r: HTMLMenuElement) => (this.dropdownMenuElm = r),
              menuStyle,
              menuPlacement,
              focusedIndex,
              hideDropdown: this.hideDropdown,
              hideDropdownAndFocusTrigger: this.hideDropdownAndFocusTrigger,
              focusItem: this.focusItem
            }}
          >
            {cloneElement(overlayComp, {
              ref: (r: DropdownMenu) => (this.dropdownElm = r)
            })}
          </DropdownMenuContext.Provider>,
          mountNode
        );
      }
    }

    return (
      <div style={style} className={classNames("c-dropdown", className)}>
        <span
          aria-haspopup="true"
          role="button"
          tabIndex={tabindex}
          className="c-dropdown-link"
          {...this.triggerProps}
        >
          {children}
          {this.show && DropdownWrap}
        </span>
      </div>
    );
  }
}
