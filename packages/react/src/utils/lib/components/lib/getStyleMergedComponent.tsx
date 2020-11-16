import * as React from "react";
import classNames from "classnames";

type CommonProps = React.PropsWithChildren<ClassNameAndStyle>;

export function getStyleMergedComponent<
  BaseProps extends CommonProps,
  NewProps = BaseProps
>(preservedProps: BaseProps) {
  return function getMergedComponent<UpdatedNewProps = NewProps>(
    Component: React.FC<CommonProps & UpdatedNewProps>
  ): React.FC<CommonProps & UpdatedNewProps> {
    return function InternalMergedComponent(
      props: CommonProps & UpdatedNewProps
    ) {
      const { className, style, ...rest } = preservedProps;
      const { className: newClassName, style: newStyle, ...newRest } = props;
      const className2Use: string = classNames(className, newClassName);
      const style2Use: React.CSSProperties = { ...style, ...newStyle };
      return (
        // @ts-ignore
        <Component
          className={className2Use}
          style={style2Use}
          {...rest}
          {...newRest}
        />
      );
    };
  };
}
