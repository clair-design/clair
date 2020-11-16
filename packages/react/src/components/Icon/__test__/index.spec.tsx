import React, { useRef, useEffect } from "react";
import { render } from "@testing-library/react";
import { IconClose } from "../lib/Close";
import { IconProps } from "../lib/Container";
import { overrideError } from "@src/utils";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});

describe("Icon", () => {
  it("props can be passed correctly", () => {
    const Component = (props: IconProps) => {
      const ref = useRef<HTMLElement>(null);
      useEffect(() => {
        const { current: element } = ref;
        if (element) {
          expect(element.classList.contains("close")).toBeTruthy();
          expect(element.style.fontSize).toMatch("18");
        }
      }, []);
      return <IconClose {...props} forwardRef={ref} />;
    };
    render(<Component style={{ fontSize: "18px" }} className="close" />);
  });
});
