export { Message } from "./lib/Message";
import { Option, messageContainer } from "./lib/MessageContainer";

type MessageFunction = (option: Option) => void;
type MessageLevelOption = Omit<Option, "type">;
type MessageLevelFunction = (option: MessageLevelOption) => void;

interface MessageObject {
  config: (option: Omit<Option, "message">) => void;
  closeAll: () => void;
  info: MessageLevelFunction;
  success: MessageLevelFunction;
  warning: MessageLevelFunction;
  error: MessageLevelFunction;
}

type MessageInterface = MessageFunction & MessageObject;

export const message: MessageInterface = (option: Option) => {
  messageContainer.init();
  messageContainer.add(option);
};

message.closeAll = () => messageContainer.closeAll();
message.config = option => messageContainer.config(option);
message.success = (option: MessageLevelOption) =>
  message({ type: "success", ...option });
message.info = (option: MessageLevelOption) =>
  message({ type: "info", ...option });
message.warning = (option: MessageLevelOption) =>
  message({ type: "warning", ...option });
message.error = (option: MessageLevelOption) =>
  message({ type: "error", ...option });
