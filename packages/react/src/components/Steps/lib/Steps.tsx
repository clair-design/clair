import React, { useEffect, useReducer, useRef } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { StepsContextType, StepStateType, StepAction } from "./types";

export const StepsContext = React.createContext<StepsContextType>({
  steps: [],
  changeStepsIds: () => void 0,
  isDot: false,
  currentKey: ""
});
function stepsReducer(state: StepStateType, action: StepAction): StepStateType {
  switch (action.type) {
    case "add":
      if (state.stepIds.includes(action.value)) {
        return state;
      }
      return { stepIds: [...state.stepIds, action.value] };
    case "clean":
      return { stepIds: [] };
    default:
      return state;
  }
}

export const Steps: React.FC<StepsProps> = props => {
  const {
    children,
    isVertical = false,
    isDot = false,
    activeKey,
    ...rest
  } = props;
  const initialState = { stepIds: [] };
  const childrenRef = useRef(children);
  const [state, dispatch] = useReducer(stepsReducer, initialState);
  useEffect(() => {
    if (childrenRef.current === children) return;
    childrenRef.current = children;
    dispatch({ type: "clean" });
  }, [children]);
  return (
    <div
      className={classnames("c-steps", {
        "c-steps--horizontal": !isVertical && !isDot,
        "c-steps--vertical": isVertical,
        "c-steps--dotted": !isVertical && isDot
      })}
      {...rest}
    >
      <StepsContext.Provider
        value={{
          isDot,
          currentKey: activeKey || "1",
          changeStepsIds: dispatch,
          steps: state.stepIds
        }}
      >
        {children}
      </StepsContext.Provider>
    </div>
  );
};

Steps.propTypes = {
  activeKey: PropTypes.string,
  isVertical: PropTypes.bool,
  isDot: PropTypes.bool,
  children: PropTypes.node.isRequired
};

export interface StepsProps {
  activeKey?: string;
  isVertical?: boolean;
  isDot?: boolean;
  children: React.ReactNode;
}
