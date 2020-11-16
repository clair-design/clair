import React, { useState, useEffect, useRef } from "react";
import { render } from "@testing-library/react";
import { getStyleMergedComponent } from "../lib/getStyleMergedComponent";
import { SharedDOMContext, DOM } from "../lib/SharedDOMContext";
import { isNull } from "lodash-es";
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

describe("utils for component", () => {
  it("merge className and style correctly", () => {
    const BaseComponent = (props: React.HTMLAttributes<HTMLDivElement>) => {
      return (
        <div {...props} role="presentation">
          base
        </div>
      );
    };
    const classNameAndStyle: ClassNameAndStyle = {
      className: "test",
      style: {
        fontSize: "16px"
      }
    };
    const Component = getStyleMergedComponent(classNameAndStyle)(BaseComponent);
    const { getByRole } = render(
      <Component className="outTest" style={{ color: "red" }} />
    );
    const div = getByRole("presentation");
    expect(
      ["test", "outTest"].every(className => div.classList.contains(className))
    ).toBe(true);
    expect(div.style).toMatchObject({ fontSize: "16px", color: "red" });
  });

  it("get/update dom correctly", () => {
    const Component = () => {
      const [dom, updateDom] = useState<DOM>(null);
      const ref = useRef<HTMLDivElement>(null);
      const initialRender = useRef(true);
      expect.assertions(2);
      useEffect(() => {
        if (initialRender.current) {
          expect(isNull(dom)).toBe(true);
          initialRender.current = false;
        }
        if (ref.current) {
          updateDom(ref.current);
        }
      }, [dom]);
      useEffect(() => {
        if (dom) {
          expect(dom.tagName.toLowerCase()).toBe("div");
        }
      }, [dom]);
      return (
        <SharedDOMContext.Provider
          value={{
            dom,
            updateDom
          }}
        >
          <div ref={ref}>test</div>
        </SharedDOMContext.Provider>
      );
    };
    render(<Component />);
  });
});
