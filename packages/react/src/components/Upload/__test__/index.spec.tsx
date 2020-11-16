import React from "react";
import { render, fireEvent, createEvent } from "@testing-library/react";
import { Upload } from "..";
import mock from "xhr-mock";
import { overrideError } from "@src/utils";
import { UploadFile } from "@components/Upload/lib/type";

let recoverError: null | Function = null;
beforeAll(() => {
  recoverError = overrideError();
});
afterAll(() => {
  if (typeof recoverError === "function") {
    recoverError();
  }
});

const url = "https://jsonplaceholder.typicode.com/posts/";

const setup = () => {
  mock.setup();
  mock.post(url, {
    status: 200,
    reason: "OK",
    body: "{}"
  });
};

const teardown = mock.teardown.bind(mock);

describe("Upload", () => {
  beforeEach(setup);
  afterEach(teardown);

  test("handle 'disabled' properly", () => {
    const { container } = render(<Upload action={url} disabled={true} />);
    const uploadDiv = container.querySelector(".c-upload") as HTMLDivElement;
    const style = getComputedStyle(uploadDiv);
    expect(style.cursor).toMatch("not-allowed");
    expect(
      (container.querySelector("button") as HTMLButtonElement).disabled
    ).toBeTruthy();
  });

  test("handle 'accept' properly", () => {
    const accept = ".jpg, .png, .dmg";
    const { container } = render(<Upload action={url} accept={accept} />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.accept).toMatch(accept);
  });

  test("handle 'multiple' properly", () => {
    const { container } = render(<Upload action={url} multiple={true} />);
    const input = container.querySelector("input") as HTMLInputElement;
    expect(input.multiple).toBeTruthy();
  });

  test("handle 'autoUpload' properly", () => {
    mock.setup();
    mock.post(url, {
      status: 404,
      reason: "Not Found",
      body: "{}"
    });
    const onError = jest.fn();

    const { container } = render(
      <Upload action={url} autoUpload={false} onError={onError} />
    );
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [new File([new Blob(["1"])], "1.png", { type: "image/png" })]
      }
    });

    expect(onError).not.toHaveBeenCalled();
  });

  test("handle ajax's properly", () => {
    const props = {
      action: url,
      name: "image",
      method: "post",
      data: { a: 1, b: 2 },
      headers: { "X-Id": 123 },
      withCredentials: true
    };
    const onHttpRequest = (params: any) => {
      expect(params.action).toEqual(props.action);
      expect(params.filename).toEqual(props.name);
      expect(params.data).toEqual(props.data);
      expect(params.headers).toEqual(props.headers);
      expect(params.withCredentials).toEqual(props.withCredentials);
      return Promise.resolve({ detail: {} });
    };
    const { container } = render(
      <Upload {...props} onHttpRequest={onHttpRequest} />
    );
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [new File([new Blob(["1"])], "1.png", { type: "image/png" })]
      }
    });
  });

  test("handle 'onBeforeUpload' properly", () => {
    const onComplete = jest.fn();
    const onBeforeUpload = (evt: CCustomEvent<any>) => {
      return evt.detail.readyFiles
        .filter((file: UploadFile) => {
          return file.rawFile.type === "image/png";
        })
        .map((f: UploadFile) => {
          return f.rawFile;
        });
    };
    const { container } = render(
      <Upload
        action={url}
        onBeforeUpload={onBeforeUpload}
        onComplete={onComplete}
      />
    );
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [
          new File([new Blob(["1"])], "1.png", { type: "image/png" }),
          new File([new Blob(["2"])], "2.jpg", { type: "image/jpg" })
        ]
      }
    });
  });

  test("upload success", done => {
    const onSuccess = jest.fn();

    const { container } = render(<Upload action={url} onSuccess={onSuccess} />);
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [new File([new Blob(["1"])], "1.png", { type: "image/png" })]
      }
    });

    setTimeout(() => {
      expect(onSuccess).toHaveBeenCalled();
      done();
    });
  });

  test("upload fail", done => {
    mock.setup();
    mock.post(url, {
      status: 404,
      reason: "Not Found",
      body: "{}"
    });
    const onError = jest.fn();

    const { container } = render(<Upload action={url} onError={onError} />);
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [new File([new Blob(["1"])], "1.png", { type: "image/png" })]
      }
    });

    setTimeout(() => {
      expect(onError).toHaveBeenCalled();
      done();
    });
  });

  test("handle exceed event", () => {
    setup();
    const events = {
      onOverSize: (evt: CCustomEvent<any>) => {
        expect(evt.detail.overMaxSizeFiles.length).toBe(1);
      },
      onOverCount: (evt: CCustomEvent<any>) => {
        expect(evt.detail.changeFiles.length).toBe(2);
      }
    };

    const { container } = render(
      <Upload action={url} maxCount={1} maxSize="2B" {...events} />
    );
    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [
          new File([new Blob(["1"])], "1.png", { type: "image/png" }),
          new File([new Blob(["1122"])], "2.png", { type: "image/png" })
        ]
      }
    });
  });

  test("handle keydown event", () => {
    const onClick = jest.fn();
    const { container } = render(<Upload action={url} />);
    const div = container.querySelector(".c-upload") as HTMLDivElement;
    const input = container.querySelector("input") as HTMLInputElement;

    input.addEventListener("click", onClick);

    fireEvent.keyDown(div, {
      key: "Enter"
    });
    expect(onClick).toHaveBeenCalled();
  });

  test("support drag file", done => {
    mock.setup();
    mock.post(url, {
      status: 404,
      reason: "Not Found",
      body: "{}"
    });
    const onError = jest.fn();
    const file = new File([new Blob(["1"])], "1.png", {
      type: "image/png"
    });

    const { container } = render(
      <Upload
        action={url}
        droppable={true}
        accept=".jpg, .png"
        onError={onError}
      />
    );
    const dropDiv = container.querySelector(
      ".c-upload__drop"
    ) as HTMLDivElement;
    const dropWrapperDiv = container.querySelector(
      "[aria-label='上传']"
    ) as HTMLDivElement;
    // https://github.com/testing-library/react-testing-library/issues/339
    const fileDropEvent = createEvent.drop(dropWrapperDiv);
    Object.defineProperty(fileDropEvent, "dataTransfer", {
      value: {
        files: [file]
      }
    });

    fireEvent.dragOver(dropWrapperDiv, {
      target: {
        files: [new File([new Blob(["1"])], "1.png", { type: "image/png" })]
      }
    });
    expect(dropDiv.classList.contains("c-upload__drop--enter")).toBeTruthy();
    fireEvent.dragLeave(dropWrapperDiv);
    expect(dropDiv.classList.contains("c-upload__drop--enter")).toBeFalsy();
    fireEvent(dropWrapperDiv, fileDropEvent);
    setTimeout(() => {
      expect(onError).toHaveBeenCalled();
      done();
    }, 100);
  });

  test("handle 'onHttpRequest' properly", done => {
    const onSuccess = jest.fn();
    const axios = {
      post(url: string, data: object) {
        const promise: Promise<CCustomEvent<any>> = new Promise(resolve => {
          setTimeout(() => {
            resolve({ detail: { url, data } } as CustomEvent);
          }, 1000);
        });
        return promise;
      }
    };
    const onHttpRequest = (option: any) => {
      const file = option.file as File;
      return axios.post("/api/upload", { file: file });
    };
    const { container } = render(
      <Upload
        action={url}
        onHttpRequest={onHttpRequest}
        onSuccess={onSuccess}
      />
    );

    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [new File([new Blob(["1"])], "1.png", { type: "image/png" })]
      }
    });

    setTimeout(() => {
      expect(onSuccess).toHaveBeenCalled();
      done();
    }, 2000);
  });

  test("handle 'onProgress' properly", done => {
    const onProgress = jest.fn();
    const onChange = jest.fn();
    const onComplete = jest.fn();
    const { container } = render(
      <Upload
        action={url}
        onProgress={onProgress}
        onChange={onChange}
        onComplete={onComplete}
      />
    );

    const input = container.querySelector("input") as HTMLInputElement;

    fireEvent.change(input, {
      target: {
        files: [new File([new Blob(["1"])], "1.png", { type: "image/png" })]
      }
    });

    setTimeout(() => {
      expect(onProgress).toHaveBeenCalled();
      expect(onChange).toHaveBeenCalled();
      expect(onComplete).toHaveBeenCalled();
      done();
    }, 2000);
  });
});
