import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Modal, ModalFuncProps } from "./Modal";
import { Button } from "@components/Button";
import { getStatusIcon } from "@components/Icon";

export function Confirm(props: ModalFuncProps) {
  const container = document.createDocumentFragment();
  document.body.appendChild(container);

  const { type, title, children, className, style } = props;

  const icon = getStatusIcon(type, {
    className: `c-icon--${type}`
  });
  const header = (
    <React.Fragment>
      {icon}
      {title}
    </React.Fragment>
  );

  function Component(): React.ReactElement {
    const [visible, setVisibility] = useState(true);
    const onClose = () => setVisibility(false);
    const footer = (
      <Button type="primary" onClick={onClose}>
        确定
      </Button>
    );

    const config = {
      visible,
      title: header,
      className,
      style,
      okCancel: false,
      maskClosable: false,
      showCloseIcon: false,
      light: true,
      destroyAfterClose: true,
      width: "400px",
      footer
    };
    return <Modal {...config}>{children}</Modal>;
  }

  // inaccurate type denotation in @types/react-dom
  // since DocumentFragment should be valid type for container
  ReactDOM.render(<Component />, (container as unknown) as Element);
}
