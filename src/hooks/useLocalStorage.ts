import { ReadingError, UnknownError } from "@/misc/messages";
import { noop, log, isBrowser } from "@/misc/utils";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

type ParserOptions<T> =
  | {
      raw: true;
    }
  | {
      raw: false;
      serializer: (value: T) => string;
      deserializer: (value: string) => T;
    };

/**
 *
 * @param _key
 * @param _value
 * @param _options
 * @returns
 */
const useLocalStorage = <T = any>(_key: string, _value: T, _options?: ParserOptions<T>) => {
  if (!isBrowser) return [_value, noop, noop];

  const deserializer = _options ? (_options.raw ? (value: T) => value : _options.deserializer) : JSON.parse;

  const initializer = useRef((key: string) => {
    try {
      const localStrgItem = window.localStorage.getItem(key);

      if (localStrgItem === null) {
        const serializer = _options ? (_options.raw ? String : _options.serializer) : JSON.stringify;
        _value && window.localStorage.setItem(key, serializer(_value));
        return _value;
      } else {
        return JSON.parse(localStrgItem);
      }
    } catch (err) {
      log(ReadingError, {
        mod: "warn",
        info: `localStorage key ${_key}`,
        err,
      });
      return _value;
    }
  });

  const [state, setState] = useState<T>(() => initializer.current(_key));

  useLayoutEffect(() => {
    setState(initializer.current(_key));
  }, [_key]);

  const set = useCallback(
    (valOfFunc: any) => {
      try {
        if (typeof valOfFunc === "undefined") {
          return;
        }

        if (typeof valOfFunc === "function") {
          valOfFunc = (valOfFunc as Function)(state);
        }
      } catch (err) {
        log(UnknownError, {
          mod: "warn",
          err,
        });
      }
    },
    [_key, state]
  );

  const remove = useCallback(() => {
    try {
      window.localStorage.removeItem(_key);
      setState(null as T);
    } catch (err) {
      log(UnknownError, {
        mod: "warn",
        err,
      });
    }
  }, []);
};

export default useLocalStorage;
