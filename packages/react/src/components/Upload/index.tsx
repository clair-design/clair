import React from "react";
import UploadCore from "./lib/UploadCore";
import { UploadProps } from "@components/Upload/lib/type";

export const Upload: React.FC<UploadProps> = React.forwardRef<
  UploadCore,
  UploadProps
>((props: UploadProps, ref) => {
  const { children, ...rest } = props;
  return (
    <UploadCore {...rest} ref={ref}>
      {children}
    </UploadCore>
  );
});

Upload.displayName = "Upload";
