import ReactDOM from "react-dom";
import React from "react";
import { IconSpin } from "@components/Icon";
import {
  LoadingCore,
  LoadingProps,
  DefaultLoadingProps,
  PText,
  hostClass
} from "./LoadingCore";

interface LoadingState {
  mountNode: Element | null;
}

export default class LoadingWrapper extends React.Component<
  LoadingProps,
  LoadingState
> {
  public static propTypes = {
    ...LoadingCore.propTypes,
    children: PText
  };

  public static defaultProps: DefaultLoadingProps = {
    loading: true,
    size: "normal",
    fullscreen: false,
    indicator: <IconSpin className="c-icon--spin" />
  };

  public static displayName: "LoadingWrapper";

  public constructor(props: LoadingProps) {
    super(props);
    this.state = {
      mountNode: null
    };
  }

  private appendLoading() {
    if (this.props.loading) {
      const dom = this.props.fullscreen
        ? document.body
        : // eslint-disable-next-line react/no-find-dom-node
          (ReactDOM.findDOMNode(this) as HTMLElement);

      this.setState({ mountNode: dom });
      if (dom) {
        const position = getComputedStyle(dom).getPropertyValue("position");
        if (position === "static") {
          dom.classList.add(...hostClass);
        } else {
          dom.classList.add("c-loading-container--hidden");
        }
      }
    } else {
      this.removeLoading();
    }
  }

  private removeLoading() {
    this.setState({ mountNode: null });
    const dom = this.props.fullscreen
      ? document.body
      : // eslint-disable-next-line react/no-find-dom-node
        (ReactDOM.findDOMNode(this) as HTMLElement);

    dom && dom.classList.remove(...hostClass);
  }

  public componentDidMount() {
    this.appendLoading();
  }

  public componentDidUpdate(prevProps: LoadingProps) {
    if (prevProps.loading !== this.props.loading) {
      this.appendLoading();
    }
  }

  public componentWillUnmount() {
    this.removeLoading();
  }

  public render() {
    const { children, fullscreen } = this.props;

    let child;
    if (React.isValidElement(children)) {
      child = React.Children.only(children);
    }

    if (!child && !fullscreen) {
      return <React.Fragment />;
    }

    return (
      <React.Fragment>
        {child}
        <LoadingCore
          {...this.props}
          mountNode={this.state.mountNode}
        ></LoadingCore>
      </React.Fragment>
    );
  }
}
