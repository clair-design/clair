import React from "react";
import LoadingWrapper from "./lib/LoadingWrapper";
import { LoadingProps } from "./lib/LoadingCore";

export const Loading: React.FC<LoadingProps> = (props: LoadingProps) => {
  const { children, ...rest } = props;
  return <LoadingWrapper {...rest}>{children}</LoadingWrapper>;
};

Loading.displayName = "Loading";
