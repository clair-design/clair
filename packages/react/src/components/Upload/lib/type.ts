import React from "react";

export enum State {
  READY = "ready",
  SUCCESS = "success",
  FAIL = "fail",
  UPLOADING = "uploading"
}

export interface UploadFile {
  fileState?: string;
  fileId?: number;
  percent?: number;
  rawFile: File;
}

type EventHandler<Detail> = (event: CCustomEvent<Detail>) => void;
type BaseDetail = {
  allFiles: UploadFile[];
};
type ReadyDetail = {
  readyFiles: UploadFile[];
} & BaseDetail;
type AfterRemoveDetail = BaseDetail;
type ProgressDetail = {
  file: UploadFile;
} & BaseDetail;
type SuccessDetail = {
  file: UploadFile;
  response: object;
} & BaseDetail;
type ErrorDetail = {
  file: UploadFile;
  error: Error | ProgressEvent<EventTarget>;
} & BaseDetail;
type BeforeUploadDetail = ReadyDetail;
type OverCountDetail = {
  changeFiles: UploadFile[];
} & BaseDetail;
type OverSizeDetail = {
  overMaxSizeFiles: UploadFile[];
} & BaseDetail;
type ChangeDetail = {
  file: UploadFile;
  type: State;
} & BaseDetail;
type CompleteDetail = {
  completeFiles: UploadFile[];
} & BaseDetail;

export interface UploadProps {
  disabled?: boolean;
  name?: string;
  accept?: string;
  action: string;
  method?: string;
  data?: {
    [key: string]: any;
  };
  headers?: {
    [key: string]: any;
  };
  withCredentials?: boolean;
  directory?: boolean;
  droppable?: boolean;
  multiple?: boolean;
  maxCount?: number;
  maxSize?: string;
  autoUpload?: boolean;
  children?: React.ReactNode;
  onReady?: EventHandler<ReadyDetail>;
  onAfterRemove?: EventHandler<AfterRemoveDetail>;
  onHttpRequest?: (
    params: object
  ) => Promise<CCustomEvent<SuccessDetail | ErrorDetail>>;
  onBeforeUpload?: (
    event: CCustomEvent<BeforeUploadDetail>
  ) => Promise<Array<File>>;
  onSuccess?: EventHandler<SuccessDetail>;
  onProgress?: EventHandler<ProgressDetail>;
  onError?: EventHandler<ErrorDetail>;
  onOverCount?: EventHandler<OverCountDetail>;
  onOverSize?: EventHandler<OverSizeDetail>;
  onChange?: EventHandler<ChangeDetail>;
  onComplete?: EventHandler<CompleteDetail>;
}

export interface UploadState {
  dragover: boolean;
  uploading: boolean;
}
