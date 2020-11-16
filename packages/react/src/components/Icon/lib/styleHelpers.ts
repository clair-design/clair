import { CSSProperties } from "react";
export const getPropertyInNumber = (
  property: [keyof CSSProperties][number]
) => (element: HTMLElement) => {
  return Number(
    getComputedStyle(element)
      .getPropertyValue(
        property.replace(/([A-Z])/g, match => `-${match.toLowerCase()}`)
      )
      .replace(/px$/, "")
  );
};

export const getFontSize = getPropertyInNumber("fontSize");
export const getStrokeWidth = getPropertyInNumber("strokeWidth");
