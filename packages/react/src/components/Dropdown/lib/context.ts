import { createContext } from "react";
import { DropdownItemContextType, DropdownMenuContextType } from "./types";

export const DropdownMenuItemContext = createContext<DropdownItemContextType>(
  {}
);
export const DropdownMenuContext = createContext<DropdownMenuContextType>({});
