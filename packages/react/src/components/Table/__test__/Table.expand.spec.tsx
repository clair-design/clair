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
  const dataSource = [
    { type: "直接访问", pv: 13, uv: 9, ip: 8 },
    { type: "搜索引擎", pv: 11, uv: 7, ip: 6 },
    { type: "外部网站", pv: 32, uv: 27, ip: 22 }
  ];

  const columns: ColumnsType = [
    {
      title: "",
      type: "expand",
      prop: "expand",
      align: "right",
      width: 0,
      render: function customRender() {
        return <p>test</p>;
      }
    },
    { title: "来源类型", prop: "type" },
    { title: "浏览量", prop: "pv" },
    { title: "访客数", prop: "uv" },
    { title: "IP 数", prop: "ip" }
  ];

  wrapper = mount(
    <Table rowKey="type" columns={columns} dataSource={dataSource} />
  );

  it("render correctly.", () => {
    expect(
      wrapper.find(".c-table__text--center > .c-table__expand--arrow")
    ).toHaveLength(3);
  });

  it("call the onExpandRow event correctly.", () => {
    const onExpandRow = jest.fn();
    wrapper.setProps({
      onExpandRow
    });

    wrapper.find(".c-table__expand--arrow").at(1).simulate("click");
    expect(onExpandRow).toBeCalled();
  });
});
