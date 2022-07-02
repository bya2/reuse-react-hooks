import { TOrN } from "@/misc/types";
import { useEffect, useState } from "react";

const getSessionStorageValue = <T>(key: string, initValue?: T): TOrN<T> => {
  const unparsedStr = window.localStorage.getItem(key);
  if (!unparsedStr) return initValue || null;

  const parsed = JSON.parse(unparsedStr);
  return parsed;
};

const useLocalStorage = <T>(key: string, initValue?: T) => {
  const [state, set] = useState<TOrN<T>>(getSessionStorageValue<T>(key, initValue));

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, set];
};

export default useLocalStorage;
