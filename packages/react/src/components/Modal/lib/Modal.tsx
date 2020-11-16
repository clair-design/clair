import React from "react";
import classNames from "classnames";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import PropTypes from "prop-types";
import { Button } from "@components/Button";
import { StatusIconProps, IconCloseBackwards } from "@components/Icon";
import { modalService, AutoIncreasingCounter } from "@clair/helpers";
import { focus } from "@src/utils";

export interface ModalProps {
  visible: boolean;
  children?: React.ReactNode;
  title?: React.ReactNode;
  top?: string;
  center?: boolean;
  width?: string;
  light?: boolean;
  showCloseIcon?: boolean;
  maskClosable?: boolean;
  destroyAfterClose?: boolean;
  className?: string;
  style?: React.CSSProperties;
  footer?: React.ReactNode;
  onConfirm?: React.EventHandler<React.SyntheticEvent>;
  onCancel?: (e: CustomCancelEvent) => void;
}

export interface ModalFuncProps
  extends Pick<ModalProps, "title" | "children" | "className" | "style"> {
  type?: StatusIconProps["type"];
}

interface ModalState {
  disappeared: boolean;
  uid: number;
  focusedDomElement: HTMLElement | null;
}

interface FocusHTMLElement extends HTMLElement {
  disabled: boolean;
  type: string;
}

type CustomCancelEvent = CCustomEvent<
  {
    sourceType: "esc" | "cancel" | "close" | "mask";
  },
  MouseEvent | KeyboardEvent
>;

const counter = new AutoIncreasingCounter();

export class Modal extends React.Component<ModalProps, ModalState> {
  public static info: (props: ModalFuncProps) => void;
  public static error: (props: ModalFuncProps) => void;
  public static success: (props: ModalFuncProps) => void;
  public static warning: (props: ModalFuncProps) => void;
  public static propTypes = {
    visible: PropTypes.bool,
    children: PropTypes.node,
    title: PropTypes.node,
    top: PropTypes.string,
    center: PropTypes.bool,
    width: PropTypes.string,
    light: PropTypes.bool,
    showCloseIcon: PropTypes.bool,
    maskClosable: PropTypes.bool,
    destroyAfterClose: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object,
    footer: PropTypes.node,
    onConfirm: PropTypes.func,
    onCancel: PropTypes.func
  };
  private confirmRef: React.RefObject<HTMLButtonElement> = React.createRef();
  private domEle!: HTMLDivElement;

  public constructor(props: Readonly<ModalProps>) {
    super(props);
    this.state = {
      disappeared: !props.visible,
      uid: counter.next(),
      focusedDomElement: null
    };
  }

  public componentDidMount() {
    if (this.props.visible) {
      this.registerGlobalEvent();
    }
  }

  public componentWillUnmount() {
    modalService.onLeave(this.domEle);
    modalService.onAfterLeave();
    this.unRegisterGlobalEvent();
  }

  public componentDidUpdate(prevProps: ModalProps) {
    if (this.props.visible === prevProps.visible) {
      return;
    }
    if (this.props.visible) {
      this.registerGlobalEvent();
    } else {
      this.unRegisterGlobalEvent();
    }
  }

  private listenToKeyDown = () => {
    document.body.addEventListener(
      "keydown",
      (this.handleKeyDown as unknown) as EventListener
    );
  };

  private stopListeningToKeyDown = () => {
    document.body.removeEventListener(
      "keydown",
      (this.handleKeyDown as unknown) as EventListener
    );
  };

  private listenToMaskClick = () => {
    document.body.addEventListener(
      "mousedown",
      (this.handleMaskClick as unknown) as EventListener
    );
  };

  private stopListeningToMaskClick = () => {
    document.body.removeEventListener(
      "mousedown",
      (this.handleMaskClick as unknown) as EventListener
    );
  };

  // when visible, react to keydown & click events
  private registerGlobalEvent = () => {
    this.listenToKeyDown();
    this.listenToMaskClick();
  };

  private unRegisterGlobalEvent = () => {
    this.stopListeningToKeyDown();
    this.stopListeningToMaskClick();
  };

  /**
   * fired immediately after the 'enter' or 'appear' class is applied
   */
  private onEnter = () => {
    this.setState({
      disappeared: false,
      focusedDomElement: document.activeElement as HTMLElement
    });
  };

  /**
   * fired after the "entering" status is applied
   */
  private onEntering = () => {
    modalService.onEnter(this.domEle);
    // if using the given confirm button
    // try to focus on that
    if (this.confirmRef.current) {
      focus({
        target: this.confirmRef.current,
        visible: true
      });
    } else {
      // simulate a tab event to focus on focus-able element
      this.handleTab(false);
    }
  };

  /**
   * fired before the "exiting" status is applied
   */
  private onExit = () => {
    modalService.onLeave(this.domEle);
    this.state.focusedDomElement?.focus();
  };

  /**
   * fired after the "exited" status is applied
   */
  private onExited = () => {
    modalService.onAfterLeave();
    this.setState({
      disappeared: true
    });
  };

  /**
   * mask click event
   */
  private handleMaskClick = (e: React.MouseEvent) => {
    const { maskClosable = true } = this.props;
    if (e.target === this.domEle && maskClosable) {
      this.getCancelHandlerWithSource("mask")(e);
    }
  };

  /**
   * cancel event
   */
  private handleCancel = (e: CustomCancelEvent) => {
    const { onCancel } = this.props;
    if (onCancel) {
      onCancel(e);
    }
  };

  private getCancelHandlerWithSource = (
    sourceType: CustomCancelEvent["detail"]["sourceType"]
  ) => (e: React.MouseEvent | React.KeyboardEvent) =>
    this.handleCancel({ ...e, detail: { sourceType } });

  /**
   * confirm event
   */
  private handleConfirm = (e: React.MouseEvent) => {
    const { onConfirm } = this.props;
    if (onConfirm) {
      onConfirm(e);
    }
  };

  /**
   * keydown event
   */
  private handleKeyDown = (e: React.KeyboardEvent) => {
    const { key, shiftKey } = e;
    const { showCloseIcon = true } = this.props;

    // Tab
    if (key === "Tab") {
      e.preventDefault();
      return this.handleTab(shiftKey);
    }
    // ESC
    if (showCloseIcon && key === "Escape") {
      const { onCancel } = this.props;
      if (onCancel) {
        this.getCancelHandlerWithSource("esc")(e);
      }
    }
  };

  private query = (selector: string) => {
    return Array.from(this.domEle.querySelectorAll(selector)) as [
      FocusHTMLElement
    ];
  };
  private handleTab = (shiftKey: boolean) => {
    const direction = shiftKey ? -1 : 1;
    const selector = "button, a[href], input, textarea, select, [tabindex]";
    const activeEle = document.activeElement as FocusHTMLElement;
    const focusEle = this.query(selector).filter(
      el => !el.disabled && el.type !== "hidden"
    );
    let nextFocusIndex = focusEle.length - 1;

    if (activeEle) {
      const index = focusEle.indexOf(activeEle);
      if (index > -1) {
        const next = index + direction;
        if (next > -1) {
          nextFocusIndex = next % focusEle.length;
        }
      }
    }
    focus({
      target: focusEle[nextFocusIndex] as HTMLElement,
      visible: true
    });
  };

  public render(): React.ReactPortal {
    const {
      title,
      visible,
      top = "15%",
      center,
      width = "50%",
      light,
      showCloseIcon = true,
      destroyAfterClose = false,
      className: customClass = "",
      style,
      footer,
      children
    } = this.props;
    const { uid } = this.state;

    const modalID = `c-modal-${uid}`;
    const headerID = `c-modal-header-${uid}`;
    const contentID = `c-modal-content-${uid}`;

    const containerStyles: React.CSSProperties = {
      display: this.state.disappeared ? "none" : "block"
    };

    const modalStyles: React.CSSProperties = {
      top: center ? "50%" : top,
      transform: center ? "translateY(-50%)" : "translateY(0)",
      width
    };

    const className: string = classNames({
      "c-modal": true,
      "c-modal--light": light
    });

    const headerNode = (
      <div className="c-modal__header" id={headerID}>
        {title && <React.Fragment>{title}</React.Fragment>}
        {showCloseIcon && !light && (
          <button className="c-modal__closeBtn">
            <IconCloseBackwards
              onClick={this.getCancelHandlerWithSource("close")}
            />
          </button>
        )}
      </div>
    );

    const contentNode = (
      <div className="c-modal__body" id={contentID}>
        {children}
      </div>
    );
    const isValidFooter: boolean =
      React.isValidElement(footer) || footer === null;
    const footerNode = (
      <div className="c-modal__footer">
        {isValidFooter ? (
          footer
        ) : (
          <React.Fragment>
            <Button onClick={this.getCancelHandlerWithSource("cancel")}>
              取消
            </Button>
            <Button
              type="primary"
              onClick={this.handleConfirm}
              forwardRef={this.confirmRef}
            >
              确定
            </Button>
          </React.Fragment>
        )}
      </div>
    );

    const modalNode = (
      <div
        aria-hidden={visible}
        style={containerStyles}
        className="c-modal__container"
        id={modalID}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headerID}
        aria-describedby={contentID}
        ref={node => {
          if (node) {
            this.domEle = node;
          }
        }}
      >
        <div
          className={classNames(className, customClass)}
          style={{ ...modalStyles, ...style }}
        >
          {headerNode}
          {contentNode}
          {footerNode}
        </div>
      </div>
    );

    return ReactDOM.createPortal(
      <CSSTransition
        appear
        in={visible}
        timeout={300}
        classNames={{
          appearActive: "c-modal-enter-active",
          enterActive: "c-modal-enter-active",
          exitActive: "c-modal-leave-active"
        }}
        onEnter={this.onEnter}
        onExit={this.onExit}
        onExited={this.onExited}
        onEntering={this.onEntering}
        unmountOnExit={destroyAfterClose}
      >
        {modalNode}
      </CSSTransition>,
      document.body
    );
  }
}
