import { TOrN } from "@/misc/types";
import { useEffect, useState } from "react";

const getSessionStorageValue = <T>(key: string, initValue?: T): TOrN<T> => {
  const unparsedStr = window.sessionStorage.getItem(key);
  if (!unparsedStr) return initValue || null;

  const parsed = JSON.parse(unparsedStr);
  return parsed;
};

const useSessionStorage = <T>(key: string, initValue?: T) => {
  const [state, set] = useState<TOrN<T>>(getSessionStorageValue<T>(key, initValue));

  useEffect(() => {
    window.sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, set];
};

export default useSessionStorage;
