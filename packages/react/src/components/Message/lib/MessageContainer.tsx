import React, { ReactNode, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { AutoIncreasingCounter, zIndexManager } from "@clair/helpers";
import { useDOM } from "@src/utils";
import { Message, MessageProps } from "./Message";

export type Option = Omit<MessageProps, "onClose" | "children"> & {
  message: ReactNode;
};

interface MessageItem {
  id: number;
  option: Option;
}

const msgIdGenerator = new AutoIncreasingCounter();

interface MessageContainerInterface {
  initiated: boolean;
  add(options: Option): void;
  stack: Option[];
  init(): void;
  closeAll(): void;
  config(option: Omit<Option, "message">): void;
  tempConfig: Omit<Option, "message"> | null;
}

const generateMessageContainer = (): MessageContainerInterface => {
  const messageContainer: MessageContainerInterface = {
    initiated: false,
    // store "option" from add method
    stack: [],
    add(option) {
      // provide functionality before container is mounted
      messageContainer.stack.push(option);
    },
    init() {
      if (messageContainer.initiated) {
        return;
      }
      const messageRoot = document.createDocumentFragment();
      document.body.appendChild(messageRoot);
      ReactDOM.render(
        <MessageContainer />,
        (messageRoot as unknown) as Element
      );
      // set the flag
      messageContainer.initiated = true;
    },
    closeAll() {
      // ignore
    },
    config(option) {
      messageContainer.tempConfig = option;
    },
    tempConfig: null
  };
  return messageContainer;
};

// using "let" since it could be reset
export let messageContainer = generateMessageContainer();

// reset container when unmount
export const resetContainer = () =>
  (messageContainer = generateMessageContainer());

export const MessageContainer: React.FC<{}> = () => {
  const [messages, updateMessages] = useState<MessageItem[]>([]);
  const [messageConfig, updateMessageConfig] = useState<
    Omit<Option, "message">
  >({
    duration: 3000,
    zIndex: Number(zIndexManager.next())
  });
  const {
    duration: defaultDuration,
    top: defaultTop,
    zIndex: defaultZIndex
  } = messageConfig;
  const remove = (key: MessageItem["id"]) =>
    updateMessages(messages.filter(item => item.id !== key));

  useEffect(() => {
    // since mounted, override the default add method
    messageContainer.add = (option: Option) => {
      updateMessages(lastMessages => {
        return lastMessages.concat({
          id: msgIdGenerator.next(),
          option
        });
      });
    };
    // flush/empty all messages
    messageContainer.closeAll = () => {
      updateMessages([]);
    };
    messageContainer.config = option =>
      updateMessageConfig(lastConfig => {
        return {
          ...lastConfig,
          ...option
        };
      });
    if (messageContainer.tempConfig) {
      messageContainer.config(messageContainer.tempConfig);
      messageContainer.tempConfig = null;
    }
    // if add method was invoked before mounted
    // render message which are stored in stack
    if (messageContainer.stack.length) {
      messageContainer.stack.forEach(option => {
        messageContainer.add(option);
      });
      messageContainer.stack = [];
    }
    return () => {
      // reset
      resetContainer();
    };
  }, []);
  // ! currently not revealed in README
  const containerStyle: React.CSSProperties = {
    zIndex: defaultZIndex || Number(zIndexManager.next()),
    top: defaultTop
  };
  const body = useDOM(() => document.body);
  if (!body) {
    return null;
  }
  return ReactDOM.createPortal(
    <div className="c-message-container" style={containerStyle}>
      {messages.map(({ id, option }) => {
        const {
          type = "info",
          message,
          duration = defaultDuration,
          top = defaultTop,
          zIndex = defaultZIndex
        } = option;
        return (
          <Message
            type={type}
            key={id}
            onClose={() => remove(id)}
            duration={duration}
            top={top}
            zIndex={zIndex}
          >
            {message}
          </Message>
        );
      })}
    </div>,
    body as Element
  );
};
