import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useRef,
  KeyboardEvent,
  useState,
  useEffect,
  CSSProperties
} from "react";
import PropTypes, { ValidationMap } from "prop-types";
import classNames from "classnames";
import { IconArrowRight } from "@components/Icon";
import { AutoIncreasingCounter } from "@clair/helpers";
const idGen = /*@__PURE__*/ new AutoIncreasingCounter();
const generateItemKey = () => `collapse-item-${idGen.next()}`;

interface OnChange {
  (args: CCustomEvent<{ key: string; isActive: boolean }>): void;
}

export interface CollapseProps extends ClassNameAndStyle {
  activeKeys?: string[];
  accordion?: boolean;
  onChange?: OnChange;
}

export interface CollapseItemProps extends ClassNameAndStyle {
  itemKey?: string;
  title?: ReactNode;
  disabled?: boolean;
}

interface UpdateActiveKey {
  (key: string): void;
}

interface CollapseContextType {
  activeKeys: string[];
  updateActiveKey: UpdateActiveKey;
}

type CollapseActiveState = "open" | "close" | "open-active" | "close-active";

const CollapseContext = createContext<CollapseContextType>({
  activeKeys: [],
  updateActiveKey: () => void 0
});

function useItemKey(key?: string) {
  const { current: ownKey } = useRef<string>(generateItemKey());
  if (typeof key === "string") {
    return key;
  }
  return ownKey;
}

function useItemId() {
  const { current: id } = useRef(generateItemKey());
  return id;
}

const CONFIRM_KEYS = ["Enter", " "];

export const CollapseItem: FC<CollapseItemProps> = props => {
  const {
    title,
    children,
    itemKey,
    disabled = false,
    className: classNameFromProps,
    style: styleFromProps
  } = props;
  const { activeKeys, updateActiveKey } = useContext(CollapseContext);
  const key = useItemKey(itemKey);
  const id = useItemId();
  const isActive: boolean = activeKeys.includes(key);
  const [style, setStyle] = useState<CSSProperties>({});
  const contentRef = useRef<HTMLDivElement>(null);
  const [activeState, setActiveState] = useState<CollapseActiveState>(
    isActive ? "open" : "close"
  );
  // transition effect
  const transitToOpenActive = () => {
    setActiveState("open-active");
    setStyle({
      maxHeight: 0
    });
  };
  const transitToCloseActive = () => {
    setActiveState("close-active");
    setStyle({
      maxHeight: contentRef.current?.scrollHeight
    });
  };
  const triggerReflow = () => contentRef.current?.scrollHeight;
  const initialRender = useRef(true);
  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }
    if (isActive) {
      transitToOpenActive();
    } else {
      transitToCloseActive();
    }
  }, [isActive]);
  useEffect(() => {
    const transitToOpen = () => {
      // max-height should be `0` here
      // since we set max-height to `0` when close
      // no need to force reflow
      setActiveState("open");
      setStyle({
        maxHeight: contentRef.current?.scrollHeight
      });
    };
    const transitToClose = () => {
      triggerReflow();
      setActiveState("close");
      setStyle({
        maxHeight: 0
      });
    };
    switch (activeState) {
      case "open-active":
        transitToOpen();
        break;
      case "close-active":
        transitToClose();
        break;
      default:
        break;
    }
  }, [activeState, style]);
  const resetStyle = () => {
    if (isActive) {
      setStyle({
        maxHeight: "none"
      });
    }
  };
  const onClick = () => {
    if (disabled) {
      return;
    }
    updateActiveKey(key);
  };
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!CONFIRM_KEYS.includes(e.key)) {
      return;
    }
    e.preventDefault();
    onClick();
  };
  const className = classNames("c-collapse-item", classNameFromProps, {
    [`c-collapse-item--active`]: isActive,
    [`c-collapse-item--disabled`]: disabled
  });
  const iconClassName = classNames("c-collapse-item__icon", {
    [`c-collapse-item__icon--active`]: isActive
  });
  const tabIndex = disabled ? void 0 : 0;
  return (
    <div className={className}>
      <div
        role="button"
        aria-expanded={isActive}
        aria-controls={id}
        aria-disabled={disabled}
        className="c-collapse-item__header"
        tabIndex={tabIndex}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        <IconArrowRight className={iconClassName} />
        <div>{title}</div>
      </div>
      <div
        className="c-collapse-item__content"
        id={id}
        ref={contentRef}
        style={{
          ...style,
          ...styleFromProps
        }}
        onTransitionEnd={resetStyle}
      >
        <div className="c-collapse-item__inner">{children}</div>
      </div>
    </div>
  );
};

CollapseItem.propTypes = {
  title: PropTypes.node,
  children: PropTypes.node,
  itemKey: PropTypes.string
} as ValidationMap<CollapseItemProps>;

function useActiveKeys(props: CollapseProps) {
  const { activeKeys, onChange: onChangeFromProps, accordion = false } = props;
  const [ownActiveKeys, setOwnActiveKeys] = useState<string[]>([]);
  const invokeOnChange = (key: string, keys: string[]) =>
    onChangeFromProps?.({
      detail: { key, isActive: !keys.includes(key) }
    });

  if (activeKeys) {
    return [
      activeKeys,
      (key: string) => invokeOnChange(key, activeKeys)
    ] as const;
  }
  const onChange = (key: string) => {
    invokeOnChange(key, ownActiveKeys);
    setOwnActiveKeys(prevKeys => {
      if (prevKeys.includes(key)) {
        return prevKeys.filter(k => k !== key);
      }
      return prevKeys.concat(key);
    });
  };
  const onChangeForAccordion = (key: string) => {
    invokeOnChange(key, ownActiveKeys);
    setOwnActiveKeys(prevKeys => {
      if (prevKeys.includes(key)) {
        return [];
      }
      return [key];
    });
  };
  if (accordion) {
    return [ownActiveKeys, onChangeForAccordion] as const;
  }
  return [ownActiveKeys, onChange] as const;
}

export const Collapse: FC<CollapseProps> = props => {
  const { className: classNameFromProps, style } = props;
  const [activeKeys, setActiveKeys] = useActiveKeys(props);
  const className = classNames("c-collapse", classNameFromProps);
  return (
    <div className={className} style={style}>
      <CollapseContext.Provider
        value={{
          activeKeys,
          updateActiveKey: setActiveKeys
        }}
      >
        {props.children}
      </CollapseContext.Provider>
    </div>
  );
};

Collapse.propTypes = {
  activeKeys: PropTypes.arrayOf(PropTypes.string),
  accordion: PropTypes.bool,
  onChange: PropTypes.func
} as ValidationMap<CollapseProps>;
