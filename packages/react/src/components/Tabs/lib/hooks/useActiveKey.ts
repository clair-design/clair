import { TabsProps } from "@components/Tabs/lib/types";
import { useCallback, useState } from "react";

export const useActiveKey = (props: TabsProps) => {
  const {
    activeKey: activeKeyFromProps,
    defaultActiveKey,
    onChange: onChangeFromProps
  } = props;
  const isControlled = typeof activeKeyFromProps === "string";
  const [activeKey, setActiveKey] = useState(
    activeKeyFromProps ?? defaultActiveKey ?? ""
  );
  const logicalActiveKey = isControlled
    ? (activeKeyFromProps as string)
    : activeKey;
  const setActiveKeyDecorator = useCallback(
    (key: string) => {
      if (!isControlled) {
        setActiveKey(key);
      }
      onChangeFromProps?.({ detail: { key } });
    },
    [onChangeFromProps, isControlled]
  );
  return [logicalActiveKey, setActiveKeyDecorator] as const;
};
