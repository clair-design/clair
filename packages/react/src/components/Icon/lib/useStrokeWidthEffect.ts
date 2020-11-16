import { useEffect, RefObject } from "react";
import { getFontSize, getStrokeWidth } from "./styleHelpers";

interface UseStrokeWidthEffectOption {
  ref: RefObject<HTMLElement>;
  baseStrokeWidth?: number;
  filledOnly?: boolean;
  deps?: any[];
}

export const useStrokeWidthEffect = (option: UseStrokeWidthEffectOption) => {
  const { ref, baseStrokeWidth = 1, filledOnly = false, deps = [] } = option;
  useEffect(() => {
    const { current: element } = ref;
    if (!element || filledOnly) {
      return;
    }
    const svg = element.querySelector("svg");
    if (!svg) {
      return;
    }

    const viewBox = svg.getAttribute("viewBox") as string;
    const size: number = Number(viewBox.split(" ").pop());
    const fontSize = getFontSize(element);
    const strokeWidth = getStrokeWidth(element);
    // in case there is some scaling
    const { width } = element.getBoundingClientRect();
    const { width: svgWidth } = svg.getBoundingClientRect();
    const zoomContainerOnPurpose = fontSize !== width;
    const widthRatio = zoomContainerOnPurpose ? 1 : svgWidth / width;
    svg.style.strokeWidth = `${
      baseStrokeWidth * strokeWidth * (size / (fontSize * widthRatio))
    }`;
    // eslint-disable-next-line
  }, deps);
};
