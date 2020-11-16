import { createContext, RefObject } from "react";

interface ConfirmContextInterface {
  confirmRef: RefObject<HTMLButtonElement> | null;
}

export const ConfirmContext = createContext<ConfirmContextInterface>({
  confirmRef: null
});
