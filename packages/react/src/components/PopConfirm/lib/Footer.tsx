import React, { useContext, useRef } from "react";
import { Button, ButtonProps } from "@components/Button";
import { ConfirmContext } from "./ConfirmContext";

export interface FooterProps {
  onConfirm: React.EventHandler<React.SyntheticEvent>;
  onCancel: React.EventHandler<React.SyntheticEvent>;
}

type FooterButtonProps = ButtonProps;

function FooterButton(props: FooterButtonProps): React.ReactElement {
  const { type = "primary", children = "确认", ...rest } = props;
  return (
    <Button type={type} size="small" {...rest}>
      {children}
    </Button>
  );
}

interface ConfirmButtonProps extends FooterButtonProps {
  onConfirm: FooterProps["onConfirm"];
}

function ConfirmButton(props: ConfirmButtonProps): React.ReactElement {
  const { onConfirm, ...rest } = props;

  const onClick = (e: React.SyntheticEvent): void => {
    if (typeof onConfirm === "function") {
      onConfirm(e);
    }
  };

  // to get reference of confirm button
  // in order to focus on it when visible
  const { confirmRef: forwardRef } = useContext(ConfirmContext);
  const backupRef = useRef<HTMLButtonElement>(null);
  const ref2Use = forwardRef || backupRef;
  return (
    <FooterButton {...rest} onClick={onClick} forwardRef={ref2Use}>
      确认
    </FooterButton>
  );
}

interface CancelButtonProps extends FooterButtonProps {
  onCancel: FooterProps["onCancel"];
}

function CancelButton(props: CancelButtonProps): React.ReactElement {
  const { onCancel, ...rest } = props;
  const onClick = (e: React.SyntheticEvent): void => {
    if (typeof onCancel === "function") {
      onCancel(e);
    }
  };
  return (
    <FooterButton {...rest} type="default" onClick={onClick}>
      取消
    </FooterButton>
  );
}

export function Footer(props: FooterProps): React.ReactElement {
  const { onConfirm, onCancel } = props;
  return (
    <div className="c-popconfirm__footer">
      <ConfirmButton onConfirm={onConfirm} />
      <CancelButton onCancel={onCancel} />
    </div>
  );
}
