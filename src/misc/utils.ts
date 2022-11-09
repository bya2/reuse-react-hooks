// Empty
export const noop = () => {};

// Event
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

// Environment
export const isProd = process.env.NODE_ENV === "production";

export const isDev = !isProd; // process.env.NODE_ENV === "development"

export const isBrowser = typeof window !== "undefined";

export const isNavigator = typeof navigator !== "undefined";
