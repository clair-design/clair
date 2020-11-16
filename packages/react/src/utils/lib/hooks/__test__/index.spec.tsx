import React, { useState, SetStateAction } from "react";
import PropTypes from "prop-types";
import { render } from "@testing-library/react";
import { useDOM, useFocusRef, useZIndex, useFindDOMEffect } from "..";
import { overrideError } from "@src/utils";
import { useEffect } from "react";
import { Dispatch } from "react";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
  jest.useFakeTimers();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
  jest.useRealTimers();
});

function DOMComponent({
  toBe,
  getTarget
}: {
  toBe: Window | Document | HTMLElement | null;
  getTarget?: () => Window | Document | HTMLElement | null;
}) {
  const dom = useDOM(getTarget);
  if (!dom) {
    return null;
  }
  expect(dom).toBe(toBe);
  return <div>content</div>;
}

const className: string = "focusTest";

function FocusComponent({ visible = true }: { visible?: boolean }) {
  const ref = useFocusRef<HTMLButtonElement>({
    visible
  });
  return (
    <button className={className} ref={ref}>
      button
    </button>
  );
}

describe("hooks", () => {
  test("useBOM: get window by default", () => {
    render(<DOMComponent toBe={window} />);
  });

  test("useBOM: get body by passing 'document.body'", () => {
    render(
      <DOMComponent toBe={document.body} getTarget={() => document.body} />
    );
  });

  test("useFocusRef: focus on the correct element", () => {
    render(<FocusComponent />);
    expect(document.activeElement).toBe(
      document.querySelector(`.${className}`)
    );
  });

  test("useFocusRef: won't focus when visible is set to false", () => {
    render(<FocusComponent visible={false} />);
    expect(
      document.activeElement === document.querySelector(`.${className}`)
    ).toBe(false);
  });

  test("useZIndex: return value even nothing passed in", () => {
    const ZIndexComponent = () => {
      const zIndex = useZIndex();
      const style: React.CSSProperties = {
        zIndex
      };
      return <div style={style} role="presentation" />;
    };
    const { getByRole } = render(<ZIndexComponent />);
    const div = getByRole("presentation");
    const zIndexAfterMount: number = Number(div.style.zIndex);
    expect(zIndexAfterMount > 2000).toBe(true);
  });

  test("useZIndex: update z-index properly", () => {
    const API: {
      updateVisible: Dispatch<SetStateAction<boolean>>;
      updateTrigger: Dispatch<SetStateAction<number>>;
    } = {
      updateVisible() {
        // code
      },
      updateTrigger() {
        // code
      }
    };
    const ZIndexComponent = () => {
      const [visible, updateVisible] = useState(true);
      const [trigger, updateTrigger] = useState(0);
      useEffect(() => {
        API.updateVisible = updateVisible;
        API.updateTrigger = updateTrigger;
      }, [updateVisible, updateTrigger, visible, trigger]);
      const zIndex = useZIndex({ visible, trigger });
      const style: React.CSSProperties = {
        zIndex
      };
      return <div style={style} role="presentation" />;
    };
    ZIndexComponent.propTypes = {
      visible: PropTypes.bool,
      trigger: PropTypes.number
    };
    const { getByRole } = render(<ZIndexComponent />);
    const div = getByRole("presentation");
    const zIndexAfterMount: number = Number(div.style.zIndex);
    expect(zIndexAfterMount > 2000).toBe(true);

    API.updateVisible(false);
    const zIndexAfterHide: number = Number(div.style.zIndex);
    expect(zIndexAfterHide).toEqual(zIndexAfterMount);

    API.updateVisible(true);
    jest.runAllTimers();
    const zIndexAfterShowAgain: number = Number(div.style.zIndex);
    expect(zIndexAfterShowAgain).toBeGreaterThan(zIndexAfterMount);

    API.updateTrigger(Date.now());
    jest.runAllTimers();
    const zIndexAfterUpdateTrigger: number = Number(div.style.zIndex);
    expect(zIndexAfterUpdateTrigger).toBeGreaterThan(zIndexAfterShowAgain);
  });

  test("useFindDOMEffect: update the DOM correctly", () => {
    expect.assertions(1);
    const DOMComponent = () => {
      const className: string = "findDOM";
      const [dom, updateDOM] = useState<Element | Text | null>(null);
      useFindDOMEffect({
        dom,
        // @ts-ignore
        effects: (domRef: Element) => {
          if (domRef) {
            expect(domRef.classList.contains(className)).toBe(true);
          }
        }
      });
      return (
        <div
          className={className}
          ref={node => {
            updateDOM(node);
          }}
        >
          useFindDOMEffect
        </div>
      );
    };
    render(<DOMComponent />);
  });
});
