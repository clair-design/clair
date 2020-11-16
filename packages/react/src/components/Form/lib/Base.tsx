import React, {
  useEffect,
  useReducer,
  useRef,
  useCallback,
  useMemo
} from "react";
import PropTypes from "prop-types";

import { EventBus, EventBusType } from "./eventBus";
import {
  callAsyncValidator,
  warnWhenElementIsNotNativeFormFieldElement,
  getNativeFieldElementInitialValue
} from "./utils";

import {
  FieldState,
  Value,
  FormResetType,
  FormGetValueType,
  FormSetValueType,
  FormControlType,
  FormValidateType,
  EventType,
  ControllerProps,
  FieldReducerType,
  ValidateDispatchType,
  AsType,
  Name2Field,
  Name2Rules,
  FormRef,
  TriggeredEventList,
  FormRefParams,
  UseEventDelegationParams,
  HandlerName2EventDelegation
} from "./type";

// 根据 formID 保存 formItem 下表单组件数据
const name2Field: Name2Field = {};
// 根据 formID 保存 formItem 下表单组件校验规则
const name2Rules: Name2Rules = {};

// 将 field 对应 reducer 注册到 eventBus 中
const useRegisterField = (
  eventBus: EventBusType,
  name: string,
  validateDispatch: ValidateDispatchType
) => {
  useEffect(() => {
    eventBus.on(name, validateDispatch);
    return () => {
      eventBus.off(name, validateDispatch);
    };
  }, [eventBus, name, validateDispatch]);
};

const fieldReducer: FieldReducerType = (state, { type, payload }) => {
  switch (type) {
    case "updateFieldState":
      return { ...state, ...payload };
    case "updateValue":
      return {
        ...state,
        value: payload.value
      };
    case "eventTriggered":
      return {
        ...state,
        triggeredTime: Date.now()
      };
    default:
      console.warn(
        `Invalid action type:${type}, It seems an error of Clair FormItem`
      );
      return state;
  }
};

const initialFieldState: FieldState = {
  isValidating: false,
  isValid: true,
  message: "",
  value: void 0,
  triggeredTime: Date.now()
};

// 收集事件回调/更新value
function getEventDelegation({
  formRef,
  triggeredEventListRef,
  name,
  eventType,
  mapValue
}: UseEventDelegationParams) {
  return (e: any) => {
    const formData = formRef.current;
    if (!formData || !formData.eventBus || !eventType) {
      return;
    }
    const { eventBus } = formData;

    triggeredEventListRef.current.push({
      eventType,
      event: Object.assign({}, e)
    });

    eventBus.trigger(name, {
      type: "eventTriggered"
    });

    if (eventType === "change" && mapValue) {
      eventBus.trigger(name, {
        type: "updateValue",
        payload: {
          value: mapValue(e)
        }
      });
    }
  };
}

function mixinDefaultFieldState(defaultValue: Value): FieldState {
  if (defaultValue !== void 0) {
    return { ...initialFieldState, value: defaultValue };
  }
  return initialFieldState;
}

// 通过 useForm 的 control 方法注册的组件可以使用该hook注册表单校验
export function useFieldState(formRef: FormRef, name: string) {
  const {
    current: { formID, eventBus }
  } = formRef;

  const { defaultValue } =
    (name2Field[formID] && name2Field[formID][name]) || {};

  const [state, dispatch] = useReducer(
    fieldReducer,
    mixinDefaultFieldState(defaultValue)
  );

  useRegisterField(eventBus, name, dispatch);
  return state;
}

const formKey = "Clair_Form";
let formIndex = 0;

export function useForm(defaultValue: Value): FormRefParams {
  const { current: formID } = useRef(`${formKey}_${formIndex++}_`);
  const defaultValueRef = useRef(defaultValue || {});
  const { current: eventBus } = useRef(new EventBus());

  name2Field[formID] = name2Field[formID] || {};
  name2Rules[formID] = name2Rules[formID] || {};
  const fieldMap = name2Field[formID];
  const rulesMap = name2Rules[formID];

  useEffect(() => {
    return () => {
      delete name2Field[formID];
      delete name2Rules[formID];
      eventBus.off();
    };
    /* eslint-disable */
  }, []);

  const getValue: FormGetValueType = useCallback(
    (nameList = Object.keys(fieldMap)) => {
      return nameList.map(name => {
        const { value } = fieldMap[name];

        return { name, value };
      });
    },
    [fieldMap]
  );

  const setValue: FormSetValueType = useCallback(
    (name, value) => {
      eventBus.trigger(name, {
        type: "updateValue",
        payload: { value }
      });
    },
    [eventBus, fieldMap]
  );

  const reset: FormResetType = useCallback(
    (nameList = Object.keys(fieldMap)) => {
      nameList.forEach((name: string) => {
        const { defaultValue } = fieldMap[name];

        eventBus.trigger(name, {
          type: "updateFieldState",
          payload: mixinDefaultFieldState(defaultValue)
        });
      });
    },
    [eventBus, fieldMap]
  );

  const setDefaultValue = reset;

  // 更新该form控制的Controller的数据
  const control: FormControlType = useCallback(
    params => {
      if (params === void 0) {
        return formRef;
      }
      const { name, defaultValue, rules, fieldType, ...exParams } = params;

      let defaultValue2Use;
      if (defaultValue !== void 0) {
        defaultValue2Use = defaultValue;
      } else if (
        defaultValueRef.current &&
        defaultValueRef.current[name] !== void 0
      ) {
        defaultValue2Use = defaultValueRef.current[name];
      }
      // 当原生表单组件没有defaultValue时需要有个非undefined的初始值使其受控
      if (defaultValue2Use === void 0 && typeof fieldType === "string") {
        warnWhenElementIsNotNativeFormFieldElement(fieldType);
        defaultValue2Use = getNativeFieldElementInitialValue(fieldType);
      }

      fieldMap[name] = Object.assign(
        fieldMap[name] || {
          defaultValue: defaultValue2Use
        },
        exParams
      );
      rules && (rulesMap[name] = rules);

      return formRef;
    },
    [fieldMap, rulesMap]
  );

  // 对纳入 useForm 控制的组件进行校验
  const validate: FormValidateType = useCallback(
    async (eventType, nameList) => {
      const eventType2Use = typeof eventType === "string" ? eventType : "";

      if (Array.isArray(eventType)) {
        nameList = eventType;
      }
      if (nameList === void 0) {
        nameList = Object.keys(fieldMap);
      }

      return Promise.all(
        nameList.map((name: string) => {
          const [{ value }] = getValue([name]);
          const rules = rulesMap[name];

          eventBus.trigger(name, {
            type: "updateFieldState",
            payload: { isValidating: true }
          });

          return callAsyncValidator({
            rules,
            trigger: eventType2Use,
            value,
            name
          }).then(validateResult => {
            eventBus.trigger(name, {
              type: "updateFieldState",
              payload: {
                isValidating: false,
                ...validateResult
              }
            });
            return validateResult;
          });
        })
      );
    },
    [eventBus, fieldMap, getValue, rulesMap]
  );

  const api = {
    formID,
    eventBus,
    getValue,
    setValue,
    reset,
    control,
    setDefaultValue,
    validate
  };
  const formRef = useRef<FormRefParams>(api);
  formRef.current = api;

  return api;
}

export const Controller = (props: ControllerProps) => {
  const {
    // 这些是 Controller 使用的props
    name,
    as,
    rules,
    defaultValue,
    onChangeName,
    onFocusName,
    onBlurName,
    valueName,
    control,
    mapValue: mapValueProp,
    // 剩下的透传给 as
    ...propsForAs
  } = props;

  /**
   * as 分2种情况处理
   *  ReactElement类型 (ex: <Field>)
   *  ReactElement.type (ex: Field)
   *    其中ReactElement.type为string时，考虑原生表单组件 (ex: 'input')
   */
  let fieldType: AsType;
  let fieldProps = null;

  if (React.isValidElement(as)) {
    fieldType = as.type;
    fieldProps = as.props;
  } else {
    fieldType = as;
  }

  const valueName2Use = typeof valueName === "string" ? valueName : "value";

  // @ts-ignore
  const belongedFormRef: FormRef = useRef();
  const triggeredEventListRef = useRef<TriggeredEventList>([]);

  if (!belongedFormRef.current) {
    belongedFormRef.current = control({
      name,
      defaultValue,
      rules,
      fieldType,
      valueName: valueName2Use
    }).current;
  }

  const { value, triggeredTime } = useFieldState(belongedFormRef, name);

  useEffect(() => {
    // 字段改变时更新 useForm 中保存的值
    belongedFormRef.current = control({
      name,
      value,
      rules,
      valueName: valueName2Use
    }).current;

    return () => {
      const { formID } = belongedFormRef.current;
      const fieldMap = name2Field[formID];
      const rulesMap = name2Rules[formID];
      fieldMap && delete fieldMap[name];
      rulesMap && delete rulesMap[name];
    };
  }, [control, name, rules, value, valueName2Use]);

  const onChangeName2Use =
    typeof onChangeName === "string" ? onChangeName : "onChange";

  const onFocusName2Use =
    typeof onFocusName === "string" ? onFocusName : "onFocus";

  const onBlurName2Use = typeof onBlurName === "string" ? onBlurName : "onBlur";

  const eventType2HandlerName = {
    change: onChangeName2Use,
    focus: onFocusName2Use,
    blur: onBlurName2Use
  };

  const validateEventTypeList: EventType[] = useMemo(() => {
    // 根据 rules 注册对应 eventHandler
    if (!Array.isArray(rules)) {
      return [];
    }
    return rules.map(({ trigger }) => trigger).filter(trigger => trigger);
  }, [rules]);

  useEffect(() => {
    const { validate } = belongedFormRef.current;
    const { current: triggeredEventList } = triggeredEventListRef;

    triggeredEventList.forEach(({ eventType, event }) => {
      // 表单校验
      if (validateEventTypeList.includes(eventType)) {
        validate(eventType, [name]);
      }
      // 触发用户注册的回调prop
      const handlerName = eventType2HandlerName[eventType];
      if (typeof props[handlerName] === "function") {
        props[handlerName](event);
      }
    });
    // 清空处理完的eventType
    triggeredEventListRef.current = [];
  }, [name, triggeredTime]);

  const mapValue =
    typeof mapValueProp === "function"
      ? mapValueProp
      : (e: React.BaseSyntheticEvent) => {
          const value2Use = e.target[valueName2Use];
          if (value2Use === void 0) {
            console.warn(
              `${valueName2Use} does not exist on ${name}'s event target`
            );
          }
          return value2Use;
        };

  /**
   * 默认只会监听onChange事件用于收集field value
   * 除此之外还需要收集：
   *    1.注册了validate rule的 eventType
   *    2.存在eventHandler prop的 eventType
   */
  const triggerSet = new Set<EventType>(["change", ...validateEventTypeList]);

  Object.keys(eventType2HandlerName).forEach(eventType => {
    const handlerName = eventType2HandlerName[eventType as EventType];

    if (typeof props[handlerName] === "function") {
      triggerSet.add(eventType as EventType);
    }
  });

  const handlerName2EventDelegation: HandlerName2EventDelegation = Array.from(
    triggerSet
  ).reduce<HandlerName2EventDelegation>((props, eventType) => {
    const handlerName2Use = eventType2HandlerName[eventType as EventType];
    const eventDelegation = getEventDelegation({
      formRef: belongedFormRef,
      triggeredEventListRef,
      triggeredTime,
      name,
      eventType,
      control,
      mapValue
    });
    props[handlerName2Use] = eventDelegation;

    return props;
  }, {});

  return React.createElement(
    fieldType,
    Object.assign({}, propsForAs, fieldProps, {
      ...handlerName2EventDelegation,
      [valueName2Use]: value,
      name
    })
  );
};

Controller.propTypes = {
  control: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired
};

export const ErrorMessage = (props: ControllerProps) => {
  const { as, control, name, ...exProps } = props;

  const belongedFormRef = control();

  const state = useFieldState(belongedFormRef, name);

  let fieldType: AsType;
  let fieldProps = null;

  if (React.isValidElement(as)) {
    fieldType = as.type;
    fieldProps = as.props;
  } else {
    fieldType = as;
  }

  if (!fieldType) {
    return null;
  }

  return React.createElement(
    fieldType,
    Object.assign(state, fieldProps, exProps)
  );
};

ErrorMessage.propTypes = {
  control: PropTypes.func.isRequired,
  as: PropTypes.oneOfType([PropTypes.elementType, PropTypes.element])
};
