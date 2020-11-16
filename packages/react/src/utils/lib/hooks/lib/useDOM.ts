import { useState, useEffect } from "react";

// window/document cannot be directly accessed in SSR mode
// you can pass something like "document", "document.body", etc
export const useDOM = (
  getBOM: () => Window | Document | HTMLElement | null = () => window
): Window | Document | HTMLElement | null => {
  const isServer = typeof window === "undefined";
  const [target, updateTarget] = useState<
    Window | Document | HTMLElement | null
  >(() => (isServer ? null : getBOM()));
  useEffect(() => {
    updateTarget(getBOM());
  }, [getBOM]);
  return target;
};
