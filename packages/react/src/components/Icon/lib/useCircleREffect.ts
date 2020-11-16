import { useEffect } from "react";
import { getFontSize, getStrokeWidth } from "./styleHelpers";

interface UseCircleREffectOption {
  ref: React.RefObject<HTMLElement>;
  baseR?: number;
  baseStrokeWidth?: number;
  baseFontSize?: number;
  deps: any[];
}

export const useCircleREffect = (option: UseCircleREffectOption) => {
  const { ref, baseR = 1, baseStrokeWidth = 2, deps = [] } = option;
  useEffect(() => {
    const { current: element } = ref;
    if (!element) {
      return;
    }
    const svg = element.querySelector("svg") as SVGElement;
    const viewBox = svg.getAttribute("viewBox") as string;
    const size: number = Number(viewBox.split(" ").pop());
    const circle = element.querySelector("circle");
    if (!circle) {
      return;
    }
    const fontSize: number = getFontSize(element);
    const strokeWidth: number = getStrokeWidth(element);
    circle.setAttribute(
      "r",
      `${baseR * (strokeWidth / baseStrokeWidth) * (size / fontSize)}`
    );
    // since style and className may cause update of fontSize and strokeWidth
    // add them to deps
    // eslint-disable-next-line
  }, deps);
};
