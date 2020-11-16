import React, { useState } from "react";
import { Input } from "@components/Input";
import { JumperProps } from "./types";

const Jumper = ({ onEnter }: JumperProps) => {
  const [value, setValue] = useState("");

  const onChange = (e: CFormEvent) => {
    setValue(e.target.value);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      const pageNumber = Number(value);
      if (pageNumber) {
        onEnter(pageNumber);
      }
    }
  };

  return (
    <div className="c-pagination__jump">
      跳至
      <Input
        htmlType="number"
        onKeyDown={onKeyDown}
        value={value}
        onChange={onChange}
      />
      页
    </div>
  );
};

export default Jumper;
