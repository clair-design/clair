import { createContext, Dispatch } from "react";
import { TabKeysAction } from "@components/Tabs/lib/hooks/useTabKeys";
import { TabPaneProps } from "@components/Tabs/lib/types";

interface TabsContextProps {
  activeKey: string;
  focusedKey: string | symbol;
  updateTabKeys: Dispatch<TabKeysAction>;
  tabPaneProps: TabPaneProps[];
}

export const TabsContext = createContext<TabsContextProps>({
  activeKey: "",
  focusedKey: Symbol(),
  updateTabKeys: () => void 0,
  tabPaneProps: []
});
