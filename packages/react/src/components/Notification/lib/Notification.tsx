import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import classNames from "classnames";
import { IconCloseBackwards, getStatusIcon } from "@components/Icon";
import { CSSTransition } from "react-transition-group";
import { zIndexManager } from "@clair/helpers";

export const placements = [
  "top-right",
  "top-left",
  "bottom-right",
  "bottom-left"
] as const;
export const iconTypes = ["", "success", "warning", "error", "info"] as const;

const NPlacement = PropTypes.oneOf([...placements]);
const NIconType = PropTypes.oneOf([...iconTypes]);

export const [DEFAULT_TYPE] = iconTypes;
export const [DEFAULT_PLACEMENT] = placements;
export const DEFAULT_SHOW_CLOSE: boolean = true;
export const DEFAULT_DURATION: number = 4500;
export const ANIMATION_DURATION: number = 240;

export type Placement = typeof placements[number];
export type IconType = typeof iconTypes[number];

export interface NotificationProps {
  title?: React.ReactNode;
  content?: React.ReactNode;
  type: IconType;
  className?: string;
  style?: React.CSSProperties;
  showClose?: boolean;
  nKey?: string;
  placement: Placement;
  duration: number;
  onClick?: React.EventHandler<React.SyntheticEvent>;
  onClose?: Function;
  onExited: Function;
  onEnter: Function;
}

export interface DefaultNotificationProps {
  type: IconType;
  placement: Placement;
  showClose: boolean;
  duration: number;
}

interface NotificationState {
  visible: boolean;
  mountNode: Element | null;
}

export function getContainerClassName(placement: Placement): string {
  return `c-notification-container--${placement}`;
}

export default class Notification extends React.Component<
  NotificationProps,
  NotificationState
> {
  public static propTypes = {
    title: PropTypes.node,
    content: PropTypes.node,
    type: NIconType,
    className: PropTypes.string,
    nKey: PropTypes.string,
    style: PropTypes.object,
    placement: NPlacement,
    onClick: PropTypes.func,
    onClose: PropTypes.func
  };
  public static defaultProps: DefaultNotificationProps = {
    type: DEFAULT_TYPE,
    placement: DEFAULT_PLACEMENT,
    showClose: DEFAULT_SHOW_CLOSE,
    duration: DEFAULT_DURATION
  };
  public static displayName: "Notification";
  private timer: number | null = null;
  public constructor(props: Readonly<NotificationProps>) {
    super(props);
    const { onEnter } = props;
    this.state = {
      visible: true,
      mountNode: null
    };
    /**
     *  在交互非常频繁的场景下会出现这样的问题：
     *    如果某个位置的Notification组件A退出，使该位置的posNum减少为0，并清除父容器posContainer
     *    而该位置存在Notification组件B准备渲染（此时B还没有触发onEnter使该位置的posNum大于0）
     *    那么B会因为找不到父容器posContainer而渲染失败
     *  触发onEnter应该尽可能在Notification渲染之前
     *  因此，选择构造函数中执行onEnter，而不是CSSTransition的enter类hook
     */
    if (typeof onEnter === "function") {
      onEnter();
    }
  }

  public componentDidMount() {
    const { duration, placement } = this.props;
    this.setState({
      mountNode: document.querySelector(`.${getContainerClassName(placement)}`)
    });
    // Notification 只显示 duration 指定的时间
    if (duration > 0) {
      this.timer = window.setTimeout(() => {
        this.setState({ visible: false });
      }, duration);
    }
  }

  public handleClose = () => {
    this.setState({
      visible: false
    });
    if (this.timer) {
      clearTimeout(this.timer);
      this.timer = null;
    }
  };

  public handleExit = () => {
    const { onClose, onExited } = this.props;
    if (typeof onClose === "function") {
      onClose();
    }
    if (typeof onExited === "function") {
      onExited();
    }
  };

  public handleClick = (e: React.MouseEvent) => {
    const { onClick } = this.props;
    if (typeof onClick === "function") {
      onClick(e);
    }
  };

  public setEntered = (entered: boolean) => {
    const { duration } = this.props;
    if (duration > 0) {
      if (entered) {
        if (this.timer) {
          clearTimeout(this.timer);
          this.timer = null;
        }
      } else {
        this.timer = window.setTimeout(() => {
          this.setState({ visible: false });
        }, duration);
      }
    }
  };

  public render(): React.ReactPortal | null {
    const {
      title,
      content,
      showClose = true,
      type = "",
      className,
      style
    } = this.props;
    const { visible, mountNode } = this.state;
    const contentNode = (
      <div className="c-notification__content">
        {title && <div className="c-notification__title">{title}</div>}
        {content}
      </div>
    );
    const styleObj: React.CSSProperties = Object.assign({}, style, {
      zIndex: zIndexManager.next()
    });

    const notificationClassName = classNames(className, "c-notification");

    const clickProps = {
      onClick: this.handleClick
    };
    const iconType: IconType | null = iconTypes.includes(type) ? type : null;

    const NotificationNode = (
      <div
        role="alert"
        className={notificationClassName}
        style={styleObj}
        {...clickProps}
        onMouseEnter={() => this.setEntered(true)}
        onMouseLeave={() => this.setEntered(false)}
      >
        {iconType && getStatusIcon(iconType)}
        {contentNode}
        {showClose && (
          <IconCloseBackwards
            role="button"
            aria-label="关闭"
            onClick={this.handleClose}
          />
        )}
      </div>
    );
    if (!mountNode) return null;
    return ReactDOM.createPortal(
      <CSSTransition
        appear
        unmountOnExit
        in={visible}
        timeout={ANIMATION_DURATION}
        classNames={{
          appearActive: "c-notification-enter-active",
          exit: "c-notification-leave-active",
          enterActive: "c-notification-enter-active",
          exitActive: "c-notification-leave-active"
        }}
        onExited={this.handleExit}
      >
        {NotificationNode}
      </CSSTransition>,
      mountNode
    );
  }
}
