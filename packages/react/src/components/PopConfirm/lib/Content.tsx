import React from "react";

export function Content(
  props: React.PropsWithChildren<{}>
): React.ReactElement {
  const { children } = props;
  return <div className="c-popconfirm__content">{children}</div>;
}
