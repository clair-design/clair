import React from "react";
import { render } from "@testing-library/react";
import { getGridSpan, getGridStart, getOrderStyle, Col, Row } from "..";
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

if (!window.matchMedia) {
  // @ts-ignore
  window.matchMedia = input => {
    return {
      addListener: () => void 0,
      removeListener: () => void 0,
      matches: input === "(max-width: 600px)"
    };
  };
}

describe("Grid", () => {
  test("getGridSpan", () => {
    expect(getGridSpan()).toEqual(`span 1`);
    expect(getGridSpan(2)).toEqual(`span 2`);
  });

  test("getGridStart", () => {
    expect(getGridStart()).toEqual("");
    expect(getGridStart(1)).toEqual("1 / ");
  });

  test("getOrderStyle", () => {
    expect(getOrderStyle(0)).toMatchObject({ order: 0 });
    // @ts-ignore
    expect(getOrderStyle("a")).toMatchObject({});
  });

  test("render static Col correctly", () => {
    const { getByText } = render(
      <Col span={2} order={1} start={1} className="col" style={{ zIndex: 0 }}>
        1
      </Col>
    );
    const dom = getByText("1");
    const style = getComputedStyle(dom);
    expect(style.gridColumn).toMatch("span 2");
    expect(style.gridColumn).toMatch("1 / ");
    expect(style.order).toMatch("1");
    expect(style.zIndex).toBe("0");
  });

  test("render responsive Col correctly", () => {
    const { getByText } = render(
      <Col xs={{ span: 2 }} lg={6} span={4}>
        1
      </Col>
    );
    const dom = getByText("1");
    const { style } = dom;
    expect(style.gridColumn).toMatch("span 2");
  });

  test("can set responsive filed of Col to number", () => {
    const { getByText } = render(
      <Col xs={2} lg={6} span={4}>
        1
      </Col>
    );
    const dom = getByText("1");
    const { style } = dom;
    expect(style.gridColumn).toMatch("span 2");
  });

  test("render static Row correctly", () => {
    render(
      <Row
        className="row"
        gutter="10px"
        justify="stretch"
        align="center"
        style={{ zIndex: 1 }}
      >
        <Col>1</Col>
        <Col>2</Col>
        <Col>4</Col>
      </Row>
    );
    const dom = document.querySelector(".row") as HTMLElement;
    const { style } = dom;
    expect(style.gridGap).toEqual("10px");
    expect(style.justifyContent).toEqual("stretch");
    expect(style.alignItems).toEqual("center");
    expect(style.zIndex).toEqual("1");
    expect(dom.querySelectorAll(".c-grid__col").length).toEqual(3);
  });

  test("default gutter of Row is 0", () => {
    render(
      <Row className="row">
        <Col>1</Col>
      </Row>
    );
    const dom = document.querySelector(".row") as HTMLElement;
    const { style } = dom;
    expect(style.gridGap).toEqual("0");
  });

  test("render responsive Row correctly", () => {
    render(
      <Row className="row" xs={{ gutter: "10px" }} gutter="20px">
        <Col>1</Col>
      </Row>
    );
    const dom = document.querySelector(".row") as HTMLElement;
    const { style } = dom;
    expect(style.gridGap).toEqual("10px");
  });
});
