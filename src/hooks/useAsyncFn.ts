import { TAsyncFunction, TPromise } from "@/misc/types";
import { DependencyList, useCallback, useRef, useState } from "react";
import useMountedState from "./useMountedState";

export type AsyncState<T> =
  | {
      loading: boolean;
      error?: undefined;
      value?: undefined;
    }
  | {
      loading: true;
      error?: Error;
      value?: T;
    }
  | {
      loading: false;
      error: Error;
      value?: undefined;
    }
  | {
      loading: false;
      error?: undefined;
      value: T;
    };

type AsyncStateFromAsyncFunction<T extends TAsyncFunction> = AsyncState<TPromise<ReturnType<T>>>;

type Return<T extends TAsyncFunction = TAsyncFunction> = [AsyncStateFromAsyncFunction<T>, T];

const useAsyncFn = <T extends TAsyncFunction>(
  _fn: T,
  _deps: DependencyList = [],
  _initState: AsyncStateFromAsyncFunction<T> = { loading: true }
): Return => {
  const lastCallId = useRef<number>(0);
  const isMounted = useMountedState();
  const [state, set] = useState<AsyncStateFromAsyncFunction<T>>(_initState);

  const cb = useCallback((...args: Parameters<T>): ReturnType<T> => {
    const callId = ++lastCallId.current;

    if (!state.loading) {
      set((prev) => ({ ...prev, loading: true }));
    }

    return _fn(...args).then(
      (value) => {
        isMounted() && callId === lastCallId.current && set({ value, loading: false });
      },
      (error) => {
        isMounted() && callId === lastCallId.current && set({ error, loading: false });
      }
    ) as ReturnType<T>;
  }, _deps);

  return [state, cb as unknown as T];
};

export default useAsyncFn;
