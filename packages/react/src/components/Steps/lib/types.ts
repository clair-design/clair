export interface StepsContextType {
  isDot: boolean;
  currentKey: string;
  changeStepsIds: React.Dispatch<StepAction>;
  steps: Array<string>;
}

export type StepStateType = {
  stepIds: Array<string>;
};

type StepsAddAction = {
  type: "add";
  value: string;
};
type StepsCleanAction = {
  type: "clean";
};
export type StepAction = StepsAddAction | StepsCleanAction;
