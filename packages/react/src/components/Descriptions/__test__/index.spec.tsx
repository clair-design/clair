import React from "react";
import { render } from "@testing-library/react";
import { DescriptionsItem, Descriptions } from "..";
import { Size } from "../lib/Descriptions";
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

const cleanUp = () => (document.body.innerHTML = "");

describe("Descriptions", () => {
  test("handle 'bordered' properly", () => {
    const { container } = render(<Descriptions bordered />);
    const table = container.querySelector(
      ".c-descriptions"
    ) as HTMLTableElement;
    expect(table.classList.contains("c-descriptions--bordered")).toBeTruthy();
    cleanUp();
  });

  test("handle 'size' properly", () => {
    const sizes: Size[] = ["large", "normal", "small"];
    sizes.forEach(size => {
      const { container } = render(<Descriptions bordered size={size} />);
      const table = container.querySelector(
        ".c-descriptions"
      ) as HTMLTableElement;
      expect(table.classList.contains(`c-descriptions--${size}`)).toBeTruthy();
      cleanUp();
    });
  });

  test("won't add additional class for incorrect 'size'", () => {
    const size: string = "a";
    // @ts-ignore
    const { container } = render(<Descriptions bordered size={size} />);
    const table = container.querySelector(
      ".c-descriptions"
    ) as HTMLTableElement;
    expect(table.classList.contains(`c-descriptions--${size}`)).toBeFalsy();
  });

  test("handle 'column' properly under non-bordered", () => {
    const { container } = render(
      <Descriptions column={2}>
        <DescriptionsItem label="a">A</DescriptionsItem>
        <DescriptionsItem label="b">B</DescriptionsItem>
        <DescriptionsItem label="c">C</DescriptionsItem>
      </Descriptions>
    );
    const tbody = container.querySelector("tbody") as HTMLTableSectionElement;
    const { firstChild, lastChild } = tbody;
    expect(firstChild?.childNodes.length).toBe(2);
    expect(lastChild?.childNodes.length).toBe(1);
    expect((lastChild?.childNodes[0] as HTMLTableCellElement).colSpan).toBe(2);
    cleanUp();
  });

  test("handle 'column' properly under bordered", () => {
    const { container } = render(
      <Descriptions column={2} bordered>
        <DescriptionsItem label="a">A</DescriptionsItem>
        <DescriptionsItem label="b">B</DescriptionsItem>
        <DescriptionsItem label="c">C</DescriptionsItem>
      </Descriptions>
    );
    const tbody = container.querySelector("tbody") as HTMLTableSectionElement;
    const { firstChild, lastChild } = tbody;
    expect(firstChild?.childNodes.length).toBe(4);
    expect(lastChild?.childNodes.length).toBe(2);
    expect((lastChild?.childNodes[1] as HTMLTableCellElement).colSpan).toBe(3);
    cleanUp();
  });

  test("render vertical layout under non-bordered", () => {
    const { container } = render(
      <Descriptions column={2} layout="vertical">
        <DescriptionsItem label="a">A</DescriptionsItem>
        <DescriptionsItem label="b">B</DescriptionsItem>
        <DescriptionsItem label="c">C</DescriptionsItem>
      </Descriptions>
    );
    const tbody = container.querySelector("tbody") as HTMLTableSectionElement;
    const rowNodes = tbody?.childNodes;
    const { firstChild, lastChild } = tbody;

    expect(rowNodes.length).toBe(4);
    expect(firstChild?.childNodes.length).toBe(2);
    expect(rowNodes[1]?.childNodes.length).toBe(2);
    expect(rowNodes[2]?.childNodes.length).toBe(1);
    expect(lastChild?.childNodes.length).toBe(1);
    expect((lastChild?.childNodes[0] as HTMLTableCellElement).colSpan).toBe(2);
    cleanUp();
  });

  test("render vertical layout under bordered", () => {
    const { container } = render(
      <Descriptions column={2} bordered layout="vertical">
        <DescriptionsItem label="a">A</DescriptionsItem>
        <DescriptionsItem label="b">B</DescriptionsItem>
        <DescriptionsItem label="c">C</DescriptionsItem>
      </Descriptions>
    );
    const tbody = container.querySelector("tbody") as HTMLTableSectionElement;
    const rowNodes = tbody?.childNodes;
    const { firstChild, lastChild } = tbody;

    expect(rowNodes.length).toBe(4);
    expect(firstChild?.childNodes.length).toBe(2);
    expect(rowNodes[1]?.childNodes.length).toBe(2);
    expect(rowNodes[2]?.childNodes.length).toBe(1);
    expect(lastChild?.childNodes.length).toBe(1);
    expect((lastChild?.childNodes[0] as HTMLTableCellElement).colSpan).toBe(2);
  });

  test("won't render for children without tag", () => {
    const { container } = render(<Descriptions>test</Descriptions>);
    const tbody = container.querySelector("tbody") as HTMLTableSectionElement;
    expect(tbody).toMatchInlineSnapshot("<tbody />");
  });
});

describe("DescriptionsItem", () => {
  test("handle 'span' properly", () => {
    const { container } = render(
      <Descriptions bordered>
        <DescriptionsItem label="a">A</DescriptionsItem>
        <DescriptionsItem label="b">B</DescriptionsItem>
        <DescriptionsItem label="c">C</DescriptionsItem>
        <DescriptionsItem label="d">D</DescriptionsItem>
        <DescriptionsItem label="e" span={3}>
          E
        </DescriptionsItem>
        <DescriptionsItem label="f" span={4}>
          F
        </DescriptionsItem>
      </Descriptions>
    );
    const tbody = container.querySelector("tbody") as HTMLTableSectionElement;
    const tbodyChildNodes = tbody.childNodes;
    expect(tbodyChildNodes.length).toBe(3);
    expect(tbodyChildNodes[0]?.childNodes.length).toBe(6);
    expect(tbodyChildNodes[1]?.childNodes.length).toBe(4);
    expect(tbodyChildNodes[2]?.childNodes.length).toBe(2);
    expect(
      (tbodyChildNodes[1]?.childNodes[3] as HTMLTableCellElement).colSpan
    ).toBe(3);
    expect(
      (tbodyChildNodes[2]?.childNodes[1] as HTMLTableCellElement).colSpan
    ).toBe(5);
    cleanUp();
  });
});
