import { useEffect } from "react";

interface UseFindDOMEffectOption {
  dom: Element | Text | null;
  effects: React.Dispatch<React.SetStateAction<Element | Text | null>>;
}

export const useFindDOMEffect = (option: UseFindDOMEffectOption) => {
  const { effects, dom } = option;
  useEffect(() => {
    if (typeof effects === "function") {
      effects(dom);
    }
  }, [dom, effects]);
};
