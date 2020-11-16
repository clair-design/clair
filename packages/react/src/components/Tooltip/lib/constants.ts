// mimic vue transition
export const TRANSITION_CLASSNAMES = {
  enter: "c-popover-fade-enter",
  enterActive: "c-popover-fade-enter-active",
  enterDone: "c-popover-fade-enter-to",
  exit: "c-popover-fade-leave",
  exitActive: "c-popover-fade-leave-active",
  exitDone: "c-popover-fade-leave-to"
} as const;

export type TransitionClassNames = typeof TRANSITION_CLASSNAMES;
export type TransitionKey = keyof TransitionClassNames;
export type TransitionClassValue = TransitionClassNames[TransitionKey];
