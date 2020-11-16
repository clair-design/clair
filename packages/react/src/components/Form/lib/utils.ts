import Schema, { ValidateSource } from "async-validator";
import { CallAsyncValidator } from "./type";

function getRules2Use(rules?: ValidateSource[]): ValidateSource[] {
  return rules || [];
}

function getFilteredRulesByTrigger(
  rules: ValidateSource[],
  trigger: string = ""
): ValidateSource[] {
  return getRules2Use(rules)
    .filter(({ trigger: ruleTrigger }) => {
      if (!ruleTrigger || trigger === "") return true;
      if (Array.isArray(ruleTrigger)) {
        return Boolean(ruleTrigger.includes(trigger));
      }
      return ruleTrigger === trigger;
    })
    .map(rule => ({ ...rule }));
}

export const isRulesRequired = (rules?: ValidateSource[]) => {
  return getRules2Use(rules).some(rule => rule.required);
};

export const callAsyncValidator: CallAsyncValidator = ({
  rules,
  trigger,
  value,
  name
}) => {
  const validResult = {
    message: "",
    isValid: true,
    name
  };

  const filteredRules = getFilteredRulesByTrigger(rules, trigger);
  if (!filteredRules.length) {
    return Promise.resolve(validResult);
  }

  const descriptor = { [name]: filteredRules };
  const validator = new Schema(descriptor);
  const model = { [name]: value };

  return validator.validate(model, { firstFields: true }).then(
    () => {
      return validResult;
    },
    ({ errors }) => {
      return {
        message: errors ? (errors[0].message as string) : "",
        isValid: false,
        name
      };
    }
  );
};

export const formNativeFieldElementTypeList = [
  "input",
  "select",
  "option",
  "textarea"
];

export function getNativeFieldElementInitialValue(elementType: string) {
  if (elementType === "option") {
    return false;
  }
  return "";
}

export function warnWhenElementIsNotNativeFormFieldElement(
  elementType: string
) {
  if (!formNativeFieldElementTypeList.includes(elementType)) {
    console.warn(
      `When "as" prop is a native html element,only support form native field element like:${formNativeFieldElementTypeList.join(
        "|"
      )},current element type is:${elementType}`
    );
  }
}
