import { useCallback, useEffect, useRef } from "react";

/**
 * 
 * @param callback 
 * @param ms 
 * @returns 
 */
const useTimeOutFn = (callback: () => void, ms: number = 0) => {
  const ready = useRef<boolean | null>(false);
  const timeout = useRef<ReturnType<typeof setTimeout>>();
  const cb = useRef(callback);

  const isReady = useCallback(() => ready.current, []);

  const set = useCallback(() => {
    ready.current = false;
    timeout.current && clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      ready.current = true;
      cb.current();
    }, ms);
  }, [ms]);

  const clear = useCallback(() => {
    ready.current = null;
    timeout.current && clearTimeout(timeout.current);
  }, []);

  useEffect(() => {
    cb.current = callback;
  }, []);

  useEffect(() => {
    set();
    return clear;
  }, [ms]);

  return [isReady, set, clear];
};

export default useTimeOutFn;
