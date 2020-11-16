import React from "react";

type T = {
  name?: string;
  disabled?: boolean;
  value: string | number | boolean;
} | null;

export const RadioGroupContext = React.createContext<T>(null);
