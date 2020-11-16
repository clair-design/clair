import React from "react";
import { mount, ReactWrapper } from "enzyme";
import { Table } from "..";
import { overrideError } from "@src/utils";
import { ColumnsType } from "../lib/types";
let wrapper!: ReactWrapper;

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
  const columns: ColumnsType = [
    {
      // eslint-disable-next-line react/display-name
      title: () => <span className="customTitle">来源类型</span>,
      prop: "type",
      fixed: "right"
    },
    { title: "浏览量", prop: "pv" },
    { title: "访客数", prop: "uv", hidden: true },
    { title: "IP 数", prop: "ip", fixed: "left" },
    {
      title: "基础信息",
      prop: "baseInfo",
      children: [
        { title: "名称", prop: "name" },
        {
          title: "地址",
          prop: "address",
          children: [
            { title: "省市", prop: "city" },
            { title: "区县", prop: "district" },
            { title: "街道", prop: "street" }
          ]
        }
      ]
    }
  ];

  const dataSource = [
    { type: "直接访问", pv: 13, uv: 9, ip: 8 },
    { type: "搜索引擎", pv: 11, uv: 7, ip: 6 },
    { type: "外部网站", pv: 32, ip: 22 }
  ];

  const spanMethod = () => {
    return {
      rowSpan: 1,
      colSpan: 1
    };
  };
  const ref = React.createRef();
  wrapper = mount(
    <Table
      rowKey="type"
      size="small"
      bordered
      height={50}
      ref={ref}
      columns={columns}
      dataSource={dataSource}
      spanMethod={spanMethod}
      rowClassName={() => "customClassName"}
    />
  );

  it("should render correctly.", () => {
    expect(wrapper.find(".c-table")).toHaveLength(1);
    expect(wrapper.find(".c-table--content")).toHaveLength(1);
    expect(wrapper.find(".c-table--small")).toHaveLength(1);
    expect(wrapper.find(".c-table--content > table")).toHaveLength(1);
    expect(wrapper.find(".customClassName").length).toBeGreaterThan(1);
    expect(wrapper.find(".customTitle")).toHaveLength(1);
  });

  it("should render empty state correctly.", () => {
    wrapper.setProps({
      dataSource: []
    });
    expect(wrapper.find(".c-empty")).toHaveLength(1);
  });
});
