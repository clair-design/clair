import React, { createContext } from "react";

export type DOM = HTMLElement | null;

export interface SharedDOMInterface<T = DOM> {
  dom: T;
  updateDom: React.Dispatch<React.SetStateAction<T>>;
}

export const SharedDOMContext = createContext<SharedDOMInterface>({
  dom: null,
  updateDom: () => void 0
});
