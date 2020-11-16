import React from "react";

interface BreadcrumbContextInterface {
  separator: React.ReactNode;
}

export const BreadcrumbContext = React.createContext<
  BreadcrumbContextInterface
>({
  separator: null
});
