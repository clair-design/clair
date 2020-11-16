import React from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

export interface IndicatorProps {
  children?: React.ReactNode;
}

export default class Indicator extends React.Component<IndicatorProps> {
  public static propTypes = {
    children: PropTypes.node
  };

  public static displayName: "Indicator";

  public constructor(props: IndicatorProps) {
    super(props);
  }

  private addClass() {
    // eslint-disable-next-line react/no-find-dom-node
    const dom = ReactDOM.findDOMNode(this) as HTMLElement;
    dom && dom.classList.add("c-loading-spin__icon");
  }

  public componentDidMount() {
    this.addClass();
  }

  public componentDidUpdate() {
    this.addClass();
  }

  public render() {
    const { children } = this.props;

    if (React.isValidElement(children)) {
      return <React.Fragment>{children}</React.Fragment>;
    }
    return <React.Fragment />;
  }
}
