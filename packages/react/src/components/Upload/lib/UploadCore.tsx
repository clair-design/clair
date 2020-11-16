import classNames from "classnames";
import React from "react";
import PropTypes from "prop-types";
import {
  ajax,
  AutoIncreasingCounter,
  isFileTypeAccepted,
  RequestOption,
  sizeToByte
} from "@clair/helpers";
import { Button } from "@components/Button";
import { IconUpload } from "@components/Icon";
import {
  State,
  UploadFile,
  UploadProps,
  UploadState
} from "@components/Upload/lib/type";

const autoIncrCounter = new AutoIncreasingCounter();
const TOTAL_PERCENT = 100;

export default class UploadCore extends React.Component<
  UploadProps,
  UploadState
> {
  public static displayName: "UploadCore";
  public static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    accept: PropTypes.string,
    action: PropTypes.string,
    method: PropTypes.string,
    data: PropTypes.object,
    headers: PropTypes.object,
    withCredentials: PropTypes.bool,
    directory: PropTypes.bool,
    droppable: PropTypes.bool,
    multiple: PropTypes.bool,
    maxCount: PropTypes.number,
    maxSize: PropTypes.string,
    autoUpload: PropTypes.bool,
    onReady: PropTypes.func,
    onAfterRemove: PropTypes.func,
    onHttpRequest: PropTypes.func,
    onBeforeUpload: PropTypes.func,
    onSuccess: PropTypes.func,
    onProgress: PropTypes.func,
    onError: PropTypes.func,
    onOverCount: PropTypes.func,
    onOverSize: PropTypes.func,
    onChange: PropTypes.func,
    onComplete: PropTypes.func
  };

  public static defaultProps = {
    disabled: false,
    name: "",
    accept: "",
    action: "",
    method: "post",
    data: {},
    headers: {},
    withCredentials: false,
    directory: false,
    droppable: false,
    multiple: false,
    maxCount: Infinity,
    maxSize: "1024 MB",
    autoUpload: true
  };

  public constructor(props: UploadProps) {
    super(props);

    this.state = {
      dragover: false,
      uploading: false
    };
  }

  public submit = () => {
    this.upload();
  };

  public remove = (fileIds: Array<number>) => {
    if (!Array.isArray(fileIds)) {
      throw new TypeError("fileIds is not an array type");
    }

    const allFiles = this.allFiles.filter(allFile => {
      return !fileIds.includes(allFile.fileId as number);
    });

    this.allFiles = allFiles;

    if (this.props.onAfterRemove) {
      this.props.onAfterRemove({
        detail: {
          allFiles: [...allFiles]
        }
      });
    }
  };

  private allFiles: Array<UploadFile> = [];
  private completeFiles: Array<UploadFile> = [];
  private fileInput: HTMLInputElement | null = null;

  private onClick = () => {
    if (this.props.disabled || this.state.uploading) return;
    const { fileInput: el } = this;
    if (!el) return;
    el.value = "";
    el.click();
  };

  private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = Array.from(event.target.files as FileList);

    if (!files.length) return;

    const { onOverSize, onOverCount } = this.props;
    const rawFiles: Array<UploadFile> = files.map(file => ({ rawFile: file }));
    const maxSize = sizeToByte(this.props.maxSize as string);

    const overMaxSizeFiles = rawFiles.filter(
      ({ rawFile: { size } }) => size > maxSize
    );
    const isOverMaxSize = overMaxSizeFiles.length > 0;

    if (isOverMaxSize && onOverSize) {
      onOverSize({
        detail: {
          overMaxSizeFiles: [...overMaxSizeFiles],
          allFiles: [...this.allFiles]
        }
      });
    }

    const allFiles = this.allFiles.concat(rawFiles);
    const isOverMaxCount = allFiles.length > (this.props.maxCount as number);
    if (isOverMaxCount && onOverCount) {
      onOverCount({
        detail: {
          changeFiles: [...rawFiles],
          allFiles: [...allFiles]
        }
      });
    }
    if (isOverMaxSize || isOverMaxCount) return;

    this.onInit(rawFiles);

    if (this.props.onReady) {
      const readyFiles = this.filterFilesByState(State.READY);
      this.props.onReady({
        detail: {
          readyFiles: [...readyFiles],
          allFiles: [...allFiles]
        }
      });
    }

    this.props.autoUpload && this.upload();
  };

  private onInit = (files: Array<UploadFile>) => {
    const rawFiles = files.map(file => {
      return {
        ...file,
        fileId: autoIncrCounter.next(),
        percent: 0,
        fileState: State.READY
      };
    });
    this.allFiles = this.allFiles.concat(rawFiles);
  };

  private upload = async () => {
    const {
      props: { onBeforeUpload },
      allFiles
    } = this;

    let readyFiles = this.filterFilesByState(State.READY);
    if (readyFiles.length === 0) return;

    if (onBeforeUpload instanceof Function) {
      let rawFiles: Array<File> = [];
      try {
        rawFiles = await onBeforeUpload({
          detail: { readyFiles: [...readyFiles], allFiles: [...allFiles] }
        });
      } catch {
        this.removeReadyFileFromAllFiles();
        return;
      }

      if (Array.isArray(rawFiles)) {
        this.removeReadyFileFromAllFiles();

        rawFiles.forEach(rawFile => {
          if (!(rawFile instanceof File)) {
            throw TypeError("rawFile is not an File type");
          }
        });

        const files = rawFiles.map(rawFile => ({ rawFile }));

        // 将files文件当作新文件来处理
        this.onInit(files);
        readyFiles = files;
      }
    }

    this.setState({ uploading: true });

    readyFiles.forEach(this.post);
  };

  private post = (file: UploadFile) => {
    const {
      props: {
        data,
        action,
        name: filename,
        headers,
        withCredentials,
        method,
        onChange,
        onComplete,
        onProgress,
        onSuccess,
        onError,
        onHttpRequest
      },
      completeFiles,
      allFiles
    } = this;

    const triggerChange: typeof onChange = params => onChange?.(params);

    const triggerComplete = () => {
      const isComplete = this.filterFilesByState(State.UPLOADING).length === 0;

      completeFiles.push(file);
      this.setState({ uploading: false });

      if (isComplete && onComplete) {
        onComplete({
          detail: {
            completeFiles,
            allFiles: [...allFiles]
          }
        });
        this.completeFiles = [];
      }
    };

    const defaultOptions = {
      headers,
      withCredentials,
      action,
      data,
      file: file.rawFile,
      filename: filename as string
    };

    const options: RequestOption = {
      ...defaultOptions,
      method: method as string,
      onProgress: (event: ProgressEvent) => {
        if (event.total > 0) {
          file.percent = (event.loaded / event.total) * TOTAL_PERCENT;
        }
        this.changeFileState(file, State.UPLOADING);
        const detail = { file: { ...file }, allFiles: [...allFiles] };
        if (onProgress) {
          onProgress({ detail, nativeEvent: event });
        }
        triggerChange({
          detail: { ...detail, type: State.UPLOADING },
          nativeEvent: event
        });
      },
      onSuccess: (response: object) => {
        this.changeFileState(file, State.SUCCESS);
        const detail = { file: { ...file }, allFiles: [...allFiles], response };
        if (onSuccess) {
          onSuccess({ detail });
        }
        triggerChange({ detail: { ...detail, type: State.SUCCESS } });
        triggerComplete();
      },
      onError: (err: Error | ProgressEvent<EventTarget>) => {
        this.changeFileState(file, State.FAIL);
        const detail = {
          file: { ...file },
          allFiles: [...allFiles],
          error: err
        };
        if (onError) {
          onError({ detail });
        }
        triggerChange({ detail: { ...detail, type: State.FAIL } });
        triggerComplete();
      }
    };

    const useCustomAjax = onHttpRequest instanceof Function;
    if (!useCustomAjax) return ajax(options);

    if (onHttpRequest) {
      onHttpRequest(defaultOptions)
        .then(options.onSuccess)
        .catch(options.onError);
    }
  };

  private changeFileState = (file: UploadFile, state: State) => {
    return (file.fileState = state);
  };

  private filterFilesByState(state: string) {
    return this.allFiles.filter(file => file.fileState === state);
  }

  private removeReadyFileFromAllFiles = () => {
    this.allFiles = this.allFiles.filter(
      file => file.fileState !== State.READY
    );
  };

  private onDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (this.props.disabled || this.state.uploading) return;
    this.setState({ dragover: true });
  };

  private onDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    this.setState({ dragover: false });
    const { accept, disabled } = this.props;

    if (disabled || this.state.uploading) return;

    let files = Array.from(event.dataTransfer.files);

    if (accept) {
      const acceptedTypeList = accept.split(",").map(type => type.trim());
      const isFileTypeAcceptedFilter = isFileTypeAccepted(acceptedTypeList);
      files = files.filter(isFileTypeAcceptedFilter);
    }

    const e = ({
      target: {
        files
      }
    } as unknown) as React.ChangeEvent<HTMLInputElement>;
    this.onChange(e);
  };

  private onDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (this.props.disabled || this.state.uploading) return;
    this.setState({ dragover: false });
  };

  private onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      this.onClick();
    }
  };

  public render() {
    const {
      name,
      multiple,
      accept,
      children,
      directory,
      disabled
    } = this.props;

    const defaultDropNode = (
      <div
        className={classNames(
          "c-upload__drop",
          this.state.dragover ? "c-upload__drop--enter" : ""
        )}
      >
        <IconUpload className="c-upload__drop-icon" />
        <p className="c-upload__drop-text">点击或将文件拖拽到这里上传</p>
        <p className="c-upload__drop-accept-text">
          支持扩展名：{accept || "*"}
        </p>
      </div>
    );

    const defaultNode = (
      <Button type="primary" disabled={disabled} loading={this.state.uploading}>
        上传
      </Button>
    );

    return (
      <div
        style={{ cursor: disabled ? "not-allowed" : "auto" }}
        className="c-upload"
        role="button"
        tabIndex={0}
        onClick={this.onClick}
        onKeyDown={this.onKeyDown}
      >
        {this.props.droppable ? (
          <div
            aria-label="上传"
            onDragEnter={this.onDragEnter}
            onDrop={this.onDrop}
            onDragOver={this.onDragEnter}
            onDragLeave={this.onDragLeave}
          >
            {children || defaultDropNode}
          </div>
        ) : (
          <div aria-label="上传">{children || defaultNode}</div>
        )}
        <input
          ref={node => {
            this.fileInput = node;
          }}
          name={name}
          type="file"
          onChange={this.onChange}
          className="c-upload--hidden"
          multiple={multiple}
          accept={accept}
          // @ts-ignore
          webkitdirectory={directory ? "webkitdirectory" : null}
        />
      </div>
    );
  }
}
