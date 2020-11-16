import { Reducer, useCallback, useReducer } from "react";
import { TabPaneProps, TabsProps } from "@components/Tabs/lib/types";

type TabKeysListItem = TabPaneProps | null;

interface TabKeysState {
  list: TabKeysListItem[];
}

interface TabKeysUpdateAction {
  type: "update";
  index: number;
  props: TabPaneProps;
}

interface TabKeysRemoveAction {
  type: "remove";
  props: TabPaneProps;
}

interface TabKeysMarkAction {
  type: "mark";
  index: number;
}

interface TabKeysSweepAction {
  type: "sweep";
}

interface TabKeysClearAction {
  type: "clear";
}

export type TabKeysAction =
  | TabKeysUpdateAction
  | TabKeysClearAction
  | TabKeysRemoveAction
  | TabKeysMarkAction
  | TabKeysSweepAction;

const reducer: Reducer<TabKeysState, TabKeysAction> = (state, action) => {
  switch (action.type) {
    case "update":
      state.list[action.index] = action.props;
      return {
        list: [...state.list]
      };
    case "clear":
      return { list: [] };
    case "mark":
      state.list[action.index] = null;
      return {
        list: [...state.list]
      };
    case "sweep":
      return {
        list: state.list.filter(Boolean)
      };
    case "remove":
      return {
        list: state.list.filter(item => {
          if (!item) {
            return true;
          }
          return item.tabKey !== action.props.tabKey;
        })
      };

    default:
      return state;
  }
};

export const useTabKeys = (props: TabsProps) => {
  const [state, dispatch] = useReducer(reducer, { list: [] });
  // important to use useCallback
  // make sure dispatchDecorator won't change too often
  // which may cause infinite update
  const dispatchDecorator: typeof dispatch = useCallback(
    action => {
      dispatch(action);
      if (action.type === "remove") {
        props.onClose?.({ detail: { key: action.props.tabKey } });
      }
    },
    [props.onClose, dispatch]
  );
  return [state, dispatchDecorator] as const;
};
