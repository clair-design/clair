import React from "react";
import { render } from "@testing-library/react";
import { Loading } from "..";
import { Size } from "../lib/LoadingCore";

describe("Loading", () => {
  test("handle 'size' properly", () => {
    const acceptableSizes: Size[] = ["normal", "small", "large"];
    acceptableSizes.forEach(size => {
      const { container } = render(
        <Loading size={size}>
          <div>size</div>
        </Loading>
      );
      const div = container.querySelector(".c-loading-spin") as HTMLDivElement;
      expect(div.classList.contains(`c-loading-spin--${size}`)).toBe(true);
    });
  });

  test("handle 'loading' properly", () => {
    const { getByText, rerender } = render(
      <Loading loading={false}>
        <div>loading</div>
      </Loading>
    );
    expect(getByText("loading").querySelector(".c-loading-mask")).toBeNull();
    rerender(
      <Loading loading={true}>
        <div>loading</div>
      </Loading>
    );
    expect(
      getByText("loading").querySelector(".c-loading-mask")
    ).not.toBeNull();
  });

  test("handle 'text' properly", () => {
    const text = "拼命加载中";
    const { getByText } = render(
      <Loading text={text}>
        <div></div>
      </Loading>
    );
    expect(getByText(text)).not.toBeNull();
  });

  test("handle 'indicator' properly", () => {
    const indicatorNode = (
      <i data-testid="custom-indicator">
        <img
          alt="loading"
          src="https://s3.ssl.qhres.com/static/236d4b33eca05fb7.svg"
        />
      </i>
    );
    const { getByTestId, getByText, rerender } = render(
      <Loading indicator={indicatorNode}>
        <div>indicator</div>
      </Loading>
    );
    expect(
      getByTestId("custom-indicator").classList.contains("c-loading-spin__icon")
    ).toBeTruthy();

    rerender(
      <Loading indicator="">
        <div>indicator</div>
      </Loading>
    );

    expect(
      getByText("indicator").querySelector(".c-loading-spin__icon")
    ).toBeNull();
  });

  test("handle 'className & style' properly", () => {
    const className = "demo-loading";
    const { getByText } = render(
      <Loading
        className={className}
        style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}
      >
        <div>className and style</div>
      </Loading>
    );
    const div = getByText("className and style");
    const loadingMask = div.querySelector(".c-loading-mask") as Element;
    expect(loadingMask.classList.contains(className)).toBeTruthy();

    const style = getComputedStyle(loadingMask);
    expect(style.backgroundColor).toMatch("rgba(255, 255, 255, 0.7)");
  });

  test("handle 'fullscreen'", () => {
    render(<Loading fullscreen={true} className="loading"></Loading>);
    const { body } = document;
    expect(
      body.classList.contains("c-loading-container--relative")
    ).toBeFalsy();
    expect(
      body
        .querySelector(".loading")
        .classList.contains("c-loading-mask--fullscreen")
    ).toBeTruthy();
    expect(body.classList.contains("c-loading-container--hidden")).toBeTruthy();
  });

  // eslint-disable-next-line max-len
  test("can't find --relative class in container when 'position' is not static", () => {
    const content = "absolute";
    const { getByText } = render(
      <Loading>
        <div style={{ position: "absolute" }}>{content}</div>
      </Loading>
    );
    expect(
      getByText(content).classList.contains("c-loading-container--relative")
    ).toBeFalsy();
  });

  test("find --relative class in container when 'position' is static", () => {
    const content = "static";
    const { getByText } = render(
      <Loading>
        <div style={{ position: "static" }}>{content}</div>
      </Loading>
    );
    expect(
      getByText(content).classList.contains("c-loading-container--relative")
    ).toBeTruthy();
  });

  test("nothing else when container doesn't have children", () => {
    const { container } = render(<Loading className="loading"></Loading>);
    expect(container.querySelector(".loading")).toBeNull();
  });
});
