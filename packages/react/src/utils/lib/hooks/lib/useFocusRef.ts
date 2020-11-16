import { useRef, useEffect } from "react";

export interface FocusRefOption {
  visible?: boolean;
  async?: boolean;
}

export interface FocusFnOption extends FocusRefOption {
  target: HTMLElement | null;
}

// trigger focus programmatically
export function focus(option: FocusFnOption) {
  const { visible, target, async = false } = option;
  if (!target || !visible) {
    return;
  }
  // use case for async:
  // wait till target become display:block;
  // since this function could be invoked before updating DOM style
  if (async) {
    Promise.resolve().then(() => target.focus());
  } else {
    target.focus();
  }
}

// return Ref
export function useFocusRef<T extends HTMLElement>(
  option: FocusRefOption
): React.RefObject<T> {
  const { visible, async } = option;
  const ref = useRef<T>(null);
  useEffect(() => {
    focus({
      target: ref.current,
      visible,
      async
    });
  }, [visible, ref, async]);
  return ref;
}
