import { createContext, MutableRefObject } from "react";
import { OptionProps } from "./Option";
interface SelectContextInterface {
  selectedOptions: OptionProps[];
  activeOption: OptionProps | null;
  handleChange: (option: OptionProps) => void;
  updateActiveOption: (option: OptionProps | null) => void;
  forwardRef: MutableRefObject<HTMLDivElement | null> | null;
}

export default createContext<SelectContextInterface>({
  selectedOptions: [],
  activeOption: null,
  forwardRef: null,
  handleChange: () => void 0,
  updateActiveOption: () => void 0
});
