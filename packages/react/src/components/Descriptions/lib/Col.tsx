import React from "react";
import { DescriptionsItemProps, DescriptionsItem } from "./DescriptionsItem";
import PropTypes from "prop-types";

const layouts = ["horizontal", "vertical"] as const;
export type Layout = typeof layouts[number];
export const PLayout = PropTypes.oneOf([...layouts]);
export type Type = "label" | "content";
export const PType = PropTypes.oneOf<Type>(["label", "content"]);

export interface ColProps {
  bordered: boolean;
  layout: Layout;
  data: DescriptionsItemProps;
  type?: Type;
}

export const Col: React.FC<ColProps> = props => {
  const { bordered, data, layout, type } = props;
  const itemCls = "c-descriptions-item";
  const labelCls = `${itemCls}__label`;
  const contentCls = `${itemCls}__content`;

  /**
   * 「水平布局+边框」中 content 的 span 计算
   * @param span 包含列的数量
   *
   * span 值表示的是 label + content 总占用列数
   * 实现中 label, content 默认各占一列，故 total 为 2 * span
   * 那么N（content） = total（2 * span）- 1（label）
   */
  const getContentSpan = (span: number = 1) => 2 * span - 1;

  if (layout === "vertical") {
    if (bordered) {
      if (type === "label") {
        return (
          <td className={labelCls} colSpan={data.span}>
            {data.label}
          </td>
        );
      } else if (type === "content") {
        return (
          <td className={contentCls} colSpan={data.span}>
            {data.children}
          </td>
        );
      }
    } else if (type === "label") {
      return (
        <td className={itemCls} colSpan={data.span}>
          <span className={labelCls}>{data.label}</span>
        </td>
      );
    } else if (type === "content") {
      return (
        <td className={itemCls} colSpan={data.span}>
          <span className={contentCls}>{data.children}</span>
        </td>
      );
    }
  }

  return bordered ? (
    <>
      <td className={labelCls}>{data.label}</td>
      <td className={contentCls} colSpan={getContentSpan(data.span)}>
        {data.children}
      </td>
    </>
  ) : (
    <td className={itemCls} colSpan={data.span}>
      <span className={labelCls}>{data.label}</span>
      <span className={contentCls}>{data.children}</span>
    </td>
  );
};

Col.propTypes = {
  bordered: PropTypes.bool.isRequired,
  layout: PLayout.isRequired,
  data: PropTypes.shape({ ...DescriptionsItem.propTypes }),
  type: PType
} as PropTypes.ValidationMap<ColProps>;

Col.displayName = "Col";
