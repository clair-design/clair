import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Table } from "..";

let wrapper!: ReactWrapper;

import { overrideError } from "@src/utils";

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

afterEach(() => {
  if (wrapper) {
    try {
      wrapper.unmount();
    } catch (e) {}
  }
});

describe("Table Sort.", () => {
  const columns = [
    { title: "来源类型", prop: "type" },
    { title: "浏览量", prop: "pv" },
    { title: "访客数", prop: "uv", sortable: true },
    { title: "IP 数", prop: "ip" }
  ];

  const dataSource = [
    { type: "直接访问", pv: 13, uv: 9, ip: 8 },
    { type: "搜索引擎", pv: 11, uv: 7, ip: 6 },
    { type: "外部网站", pv: 32, uv: 27, ip: 22 }
  ];

  wrapper = mount(
    <Table
      rowKey="type"
      columns={columns}
      dataSource={dataSource}
      defaultSort={{
        column: "uv",
        order: "ascending"
      }}
    />
  );

  it("render correctly.", () => {
    expect(wrapper.find(".c-table__sort--asc-icon")).toHaveLength(1);
    expect(wrapper.find(".c-table__sort--desc-icon")).toHaveLength(1);
  });

  it("execute some events correctly.", () => {
    const onSortChange = jest.fn();
    wrapper.setProps({
      onSortChange
    });
    // click
    wrapper.find(".c-table__sort--asc-icon").simulate("click");
    expect(onSortChange).toBeCalled();

    wrapper.find(".c-table__sort--desc-icon").simulate("click");
    expect(onSortChange).toBeCalled();
  });
  it("monitor keyboard events correctly.", () => {
    const onSortChange = jest.fn();
    wrapper.setProps({
      onSortChange
    });

    wrapper
      .find(".c-table__sort--asc-icon")
      .simulate("keyDown", { key: "Enter" });
    expect(onSortChange).toBeCalled();

    wrapper.find(".c-table__sort--desc-icon").simulate("keyDown", { key: " " });
    expect(onSortChange).toBeCalled();
  });
});
