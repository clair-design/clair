import React, { useEffect, useState } from "react";
import { Modal, ModalFuncProps, ModalProps } from "./lib/Modal";
import { Confirm } from "./lib/Confirm";

// support SSR
const useRealModal = (): boolean => {
  const [use, updateUse] = useState(false);
  useEffect(() => {
    updateUse(true);
  }, []);
  return use;
};

function ModalExport(props: ModalProps) {
  const { children, ...rest } = props;
  const shouldUseModal: boolean = useRealModal();
  return shouldUseModal ? <Modal {...rest}>{children}</Modal> : null;
}

Modal.info = (props: ModalFuncProps) => {
  const config: ModalFuncProps = {
    type: "info",
    ...props
  };
  return Confirm(config);
};
Modal.warning = (props: ModalFuncProps) => {
  const config: ModalFuncProps = {
    type: "warning",
    ...props
  };
  return Confirm(config);
};
Modal.success = (props: ModalFuncProps) => {
  const config: ModalFuncProps = {
    type: "success",
    ...props
  };
  return Confirm(config);
};
Modal.error = (props: ModalFuncProps) => {
  const config: ModalFuncProps = {
    type: "error",
    ...props
  };
  return Confirm(config);
};

ModalExport.info = Modal.info;
ModalExport.success = Modal.success;
ModalExport.warning = Modal.warning;
ModalExport.error = Modal.error;
ModalExport.displayName = "Modal";

export { ModalExport as Modal };
