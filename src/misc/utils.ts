export const noop = () => {};

export const on = <T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T["addEventListener"]> | [string, Function | null, ...any]
): void => {
  if (obj?.addEventListener) {
    obj.addEventListener(...(args as Parameters<HTMLElement["addEventListener"]>));
  }
};

export const off = <T extends Window | Document | HTMLElement | EventTarget>(
  obj: T | null,
  ...args: Parameters<T["removeEventListener"]> | [string, Function | null, ...any]
): void => {
  if (obj?.removeEventListener) {
    obj.removeEventListener(...(args as Parameters<HTMLElement["removeEventListener"]>));
  }
};