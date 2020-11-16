/* eslint-disable @typescript-eslint/no-explicit-any */
declare type OneOf<T extends any[]> = T[number];

declare type ReExport<T extends any[]> = Array<T[number]>;

declare type UnPacked<T extends any[]> = OneOf<T>;
// workaround & inaccurate
declare function isNaN(arg?: any): arg is Exclude<number, any>;

interface CCustomEvent<
  Detail extends {
    [key: string]: any;
  },
  E = Event
> {
  detail: Detail;
  nativeEvent?: E;
}

interface CFormEvent<Value = any, E = Event> {
  target: {
    value: Value;
  };
  nativeEvent?: E;
}
