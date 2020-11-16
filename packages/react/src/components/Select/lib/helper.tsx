import {
  Children,
  ComponentProps,
  JSXElementConstructor,
  MutableRefObject,
  ReactElement,
  ReactNode,
  SyntheticEvent
} from "react";
import { curry } from "ramda";
import { Option, OptionProps } from "./Option";
import { OptionGroup, RenderOptionGroupProps } from "./OptionGroup";
import { createError } from "@src/utils";

export type FilterFunction = (
  option: OptionProps,
  filterText: string
) => boolean;
export type FilteredChild = FilteredOption | FilteredOptionGroup;
type OptionChild = ReactElement<ComponentProps<typeof Option>, typeof Option>;
type OptionGroupChild = ReactElement<
  ComponentProps<typeof OptionGroup>,
  typeof OptionGroup
>;
type FilteredOption = {
  props: OptionProps;
  displayName: "Option";
};
type FilteredOptionGroup = {
  props: RenderOptionGroupProps;
  displayName: "OptionGroup";
};
export type FilterOption = {
  filter: MutableRefObject<FilterFunction>;
  filterText: string;
  filterable: boolean;
};
export type Value = SingleSelectValue | MultipleSelectValue;
type SingleSelectValue = number | string;
type MultipleSelectValue = Array<SingleSelectValue>;
function isType<
  T extends JSXElementConstructor<any>,
  P extends ComponentProps<T>
>(type: T) {
  return function isSpecificType(
    element: ReactElement
  ): element is ReactElement<P, T> {
    return element.type === type;
  };
}

const isOption = isType(Option);
const isOptionGroup = isType(OptionGroup);

export function flattenOptions(children: ReactNode) {
  const result = [];
  const childrenInArray = Children.toArray(children) as (
    | OptionChild
    | OptionGroupChild
    | any
  )[];

  for (const child of childrenInArray) {
    if (isOption(child)) {
      result.push(child);
    } else if (isOptionGroup(child)) {
      const groupOptions = flattenOptions(
        child.props.children
      ) as OptionChild[];
      result.push(...groupOptions);
    }
  }
  return result;
}

export function collectOptions(children: ReactNode): FilteredChild[] {
  const result = [];
  const childrenInArray = Children.toArray(children) as (
    | OptionChild
    | OptionGroupChild
    | any
  )[];
  for (const child of childrenInArray) {
    if (isOption(child)) {
      result.push({
        displayName: "Option" as const,
        // ! cannot use spread operator here
        // since selected state check is using the reference of OptionProps
        // so it needs to stay the same
        props: child.props
      });
    } else if (isOptionGroup(child)) {
      const options = collectOptions(child.props.children) as FilteredOption[];
      const newGroup = {
        displayName: "OptionGroup" as const,
        props: {
          ...child.props,
          options: options.map(option => option.props)
        }
      };
      result.push(newGroup);
    } else {
      throw createError(
        "INVALID TYPE",
        `Expect Option or OptionGroup but get ${child?.type ?? child}`
      );
    }
  }
  return result;
}

function filterOptionsInternal(
  filterOption: FilterOption,
  options: FilteredChild[]
) {
  const shouldKeepOption = (optionProps: OptionProps) => {
    if (!filterOption) return true;
    const { filterable, filterText, filter } = filterOption as FilterOption;
    return (
      !filterable || !filterText || filter?.current?.(optionProps, filterText)
    );
  };
  const result = [];
  for (const option of options) {
    if (option.displayName === "Option") {
      if (shouldKeepOption(option.props)) {
        result.push(option);
      }
    } else if (option.displayName === "OptionGroup") {
      const groupResult = [];
      for (const groupOption of option.props.options) {
        if (shouldKeepOption(groupOption)) {
          groupResult.push(groupOption);
        }
      }
      const newGroupOption = Object.assign({}, option);
      // only keep filtered ones
      newGroupOption.props.options = groupResult;
      result.push(newGroupOption);
    }
  }
  return result;
}

export const filterOptions = curry(filterOptionsInternal);

export function generateFormEvent(
  value?: unknown,
  e?: SyntheticEvent
): CFormEvent {
  return {
    target: {
      value
    },
    nativeEvent: e?.nativeEvent
  };
}

export function generateCustomEvent<T extends { [key: string]: unknown }>(
  detail: T,
  e?: SyntheticEvent
): CCustomEvent<T> {
  return {
    detail,
    nativeEvent: e?.nativeEvent
  };
}

export function getValue(
  selectedOptionProps: OptionProps[],
  isMultipleMode: boolean
): Value | undefined {
  const valueInArray = selectedOptionProps.map(option => option.value);
  if (isMultipleMode) {
    return valueInArray;
  }
  return valueInArray[0];
}

function getNextOption(
  selectableOptionProps: OptionProps[],
  activeOptionProps: OptionProps | null,
  delta: number
) {
  if (!selectableOptionProps.length) {
    return activeOptionProps;
  }
  const activeIndex = selectableOptionProps.findIndex(
    props => props.value === activeOptionProps?.value
  );
  let nextIndex;
  const { length } = selectableOptionProps;
  if (activeIndex < 0) {
    // select first option if none is active
    delta = delta === 1 ? 0 : delta;
    nextIndex = (length + delta) % length;
  } else {
    // handle case where `Math.abs(delta) > length`
    // hence `(activeIndex + delta + length) % length` could be negative
    nextIndex = (((activeIndex + delta + length) % length) + length) % length;
  }
  return selectableOptionProps[nextIndex] ?? null;
}

type findNextOrPrevActiveOptionParam = {
  filteredChildren: Array<FilteredChild>;
  activeOptionProps: null | OptionProps;
  delta: number;
};
export function findNextOrPrevActiveOption({
  filteredChildren,
  activeOptionProps,
  delta = 1
}: findNextOrPrevActiveOptionParam): null | OptionProps {
  if (!filteredChildren.length) return null;
  const shiftDistance = delta;
  const flatOptionProps: OptionProps[] = [];
  for (const child of filteredChildren) {
    if (child.displayName === "Option") {
      flatOptionProps.push(child.props);
    } else {
      flatOptionProps.push(...child.props.options);
    }
  }
  const selectableOptionProps = flatOptionProps.filter(
    optionProps => !optionProps.disabled
  );
  return getNextOption(selectableOptionProps, activeOptionProps, shiftDistance);
}

export function getLabel(option: OptionProps): string {
  let text: string = "";
  type Children = ReactNode & ReactElement;

  function isValidChildren(element: any): element is Children {
    return Boolean(element);
  }

  if (isValidChildren(option.children)) {
    // have side effect: update `text`
    const accText = (element: Children) => {
      if (typeof element === "string") {
        text += element;
      } else if (element.props.children) {
        if (Array.isArray(element.props.children)) {
          element.props.children.forEach(accText);
        } else {
          accText(element.props.children);
        }
      }
    };
    accText(option.children);
  } else if (option.label) {
    text = option.label;
  }
  return text;
}

// given `filterText`, return whether the option should be shown
export function filter(option: OptionProps, filterText: string): boolean {
  const label = getLabel(option);
  return label.toLocaleLowerCase().includes(filterText.toLocaleLowerCase());
}
