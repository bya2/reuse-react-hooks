import { useEffect, useState } from "react";
import { noop, log, isBrowser } from "@/misc/utils";
import { ReadingError, UnknownError } from "@/misc/messages";

/**
 * @param _key 
 * @param _value 
 * @param _raw 
 * @returns 
 */
const useSessionStorage = <T = any>(_key: string, _value: T, _raw: boolean = false): [T, (value: T) => void] => {
  if (!isBrowser) return [_value, noop];

  const [state, set] = useState<T>(() => {
    try {
      const sessStrgItem = window.sessionStorage.getItem(_key);

      if (typeof sessStrgItem === "string") {
        return _raw ? sessStrgItem : JSON.parse(sessStrgItem || "null");
      } else {
        window.sessionStorage.setItem(_key, _raw ? String(_value) : JSON.stringify(_value));
        return _value;
      }
    } catch (err) {
      log(ReadingError, {
        info: `sessionStorage key "${_key}"`,
        err,
      });
      return _value;
    }
  });

  useEffect(() => {
    try {
      const serializedState = _raw ? String(state) : JSON.stringify(state);
      window.sessionStorage.setItem(_key, serializedState);
    } catch (err) {
      log(UnknownError, {
        err,
      });
    }
  }, [_key]);

  return [state, set];
};

export default useSessionStorage;
