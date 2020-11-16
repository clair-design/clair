import React, { useState } from "react";
import { Input } from "..";
import { PasswordProps, PasswordPropTypes } from "./types";
import { IconEyeClosed, IconEye } from "@components/Icon";

type HtmlTypes = "password" | "text";

export const Password: React.FC<PasswordProps> = ({
  allowToggle = true,
  ...rest
}) => {
  const [htmlType, setHtmlType] = useState("password" as HtmlTypes);

  const onToggle = (type: HtmlTypes) => {
    setHtmlType(type);
  };

  const suffixIcon =
    htmlType === "password" ? (
      <IconEyeClosed onClick={() => onToggle("text")} />
    ) : (
      <IconEye onClick={() => onToggle("password")} />
    );
  return (
    <Input
      {...rest}
      htmlType={htmlType}
      suffixIcon={allowToggle ? suffixIcon : null}
    />
  );
};

Password.propTypes = PasswordPropTypes;
