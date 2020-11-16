import React, { RefObject } from "react";
import ReactDOM from "react-dom";
import Notification, {
  DEFAULT_PLACEMENT,
  getContainerClassName,
  Placement,
  NotificationProps
} from "./lib/Notification";
export { ANIMATION_DURATION } from "./lib/Notification";

type PosN = { [key in Placement]: number };
type NContainer = { [key in Placement]: HTMLElement | null };
interface NRoom {
  [propName: string]: {
    placement: Placement;
    container: DocumentFragment;
    notificationRef: RefObject<Notification>;
  };
}

type NotificationFuncProps = Partial<
  Omit<NotificationProps, "onExited" | "onEnter" | "nKey">
>;

const posNum: PosN = {
  "top-right": 0,
  "top-left": 0,
  "bottom-right": 0,
  "bottom-left": 0
};

const notificationContainer: NContainer = {
  "top-right": null,
  "top-left": null,
  "bottom-right": null,
  "bottom-left": null
};

let globalConfig: NotificationFuncProps = {};
const notificationKeyRoom: NRoom = {};

function genKey(): string {
  const substrStart = 3;
  const substrLength = 8;
  const toStringInt = 36;
  return Number(
    Math.random().toString().substr(substrStart, substrLength) + Date.now()
  ).toString(toStringInt);
}

// 设置Notification组件相关，同时设置Notification位置Container & nKey相关
function renderElement(props: NotificationFuncProps): { close: () => void } {
  //container相关元素
  const { placement = DEFAULT_PLACEMENT } = props;
  const container = document.createDocumentFragment();
  const posClass = getContainerClassName(placement);
  const notificationRef = React.createRef<Notification>();
  const nKey = genKey();

  // KeyRoom设置
  notificationKeyRoom[nKey] = {
    placement,
    container,
    notificationRef
  };

  // 初始化Container
  if (notificationContainer[placement] === null) {
    const divEle: HTMLElement = document.createElement("div");
    divEle.classList.add("c-notification-container", posClass);
    document.body.appendChild(divEle);
    notificationContainer[placement] = divEle;
  }
  // 设置DOM并插入Container
  (notificationContainer[placement] as HTMLElement).appendChild(container);

  ReactDOM.render(
    <Notification
      ref={notificationRef}
      {...props}
      onExited={() => {
        posNum[placement] -= 1;
        // 此位置Notification全部消失时，移除Container
        if (posNum[placement] === 0) {
          if (notificationContainer[placement]) {
            document.body.removeChild(
              notificationContainer[placement] as HTMLElement
            );
            notificationContainer[placement] = null;
          }
        }
        // 更新keyRoom
        delete notificationKeyRoom[nKey];
        // React组件树上销毁Notification
        ReactDOM.unmountComponentAtNode((container as unknown) as Element);
      }}
      onEnter={() => {
        posNum[placement] += 1;
      }}
    />,
    (container as unknown) as Element
  );

  return {
    close: () => {
      // 暴露close方法
      const { notificationRef } = notificationKeyRoom[nKey];
      if (notificationRef.current) {
        notificationRef.current.handleClose();
      }
      delete notificationKeyRoom[nKey];
    }
  };
}

const notificationAPI = {
  open(props: NotificationFuncProps) {
    const config: NotificationFuncProps = {
      ...globalConfig,
      ...props
    };
    return renderElement(config);
  },
  info(props: NotificationFuncProps) {
    const config: NotificationFuncProps = {
      type: "info",
      ...globalConfig,
      ...props
    };
    return renderElement(config);
  },
  warning(props: NotificationFuncProps) {
    const config: NotificationFuncProps = {
      type: "warning",
      ...globalConfig,
      ...props
    };
    return renderElement(config);
  },
  success(props: NotificationFuncProps) {
    const config: NotificationFuncProps = {
      type: "success",
      ...globalConfig,
      ...props
    };
    return renderElement(config);
  },
  error(props: NotificationFuncProps) {
    const config: NotificationFuncProps = {
      type: "error",
      ...globalConfig,
      ...props
    };
    return renderElement(config);
  },
  config(props: NotificationFuncProps) {
    globalConfig = Object.assign(
      {},
      {
        ...globalConfig,
        ...props
      }
    );
  },
  closeAll() {
    Object.keys(notificationKeyRoom).forEach(nKey => {
      const { notificationRef } = notificationKeyRoom[nKey];
      if (notificationRef.current) {
        notificationRef.current.handleClose();
      }
      delete notificationKeyRoom[nKey];
    });
  }
};

export { notificationAPI as notification };
