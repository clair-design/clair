import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Table } from "..";

let wrapper!: ReactWrapper;

import { overrideError } from "@src/utils";
import { ColumnsType } from "../lib/types";

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

describe("Table Expand.", () => {
  const columns: ColumnsType = [
    {
      title: "",
      type: "selection",
      prop: "selected",
      align: "center",
      width: 0
    },
    { title: "来源类型", prop: "type" },
    { title: "浏览量", prop: "pv" },
    { title: "访客数", prop: "uv" },
    { title: "IP 数", prop: "ip" }
  ];

  const dataSource = [
    { type: "直接访问", pv: 13, uv: 9, ip: 8 },
    { type: "搜索引擎", pv: 11, uv: 7, ip: 6 },
    { type: "外部网站", pv: 32, uv: 27, ip: 22 }
  ];

  const selectedRowKeys = ["搜索引擎", "直接访问", "外部网站"];

  wrapper = mount(
    <Table
      rowKey="type"
      columns={columns}
      dataSource={dataSource}
      defaultSelectedRowKeys={selectedRowKeys}
    />
  );

  it("should render correctly.", () => {
    expect(wrapper.find("thead .c-checkbox")).toHaveLength(1);
    expect(wrapper.find("tbody .c-checkbox")).toHaveLength(3);
    expect(wrapper.find(".c-checkbox input").length).toBeGreaterThan(1);
  });

  it("execute the onSelectRow event correctly.", () => {
    const onSelectRow = jest.fn();
    wrapper.setProps({
      onSelectRow
    });
    wrapper.find(".c-checkbox input").at(1).simulate("change");
    expect(onSelectRow).toBeCalled();
  });

  it("execute the onSelectAll event correctly.", () => {
    const onSelectAll = jest.fn();
    wrapper.setProps({
      onSelectAll
    });
    wrapper.find("thead .c-checkbox input").at(0).simulate("change");
    expect(onSelectAll).toBeCalled();
  });
});
