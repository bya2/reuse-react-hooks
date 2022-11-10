import { useMemo, useState } from "react";

interface Actions<T> {
  set: React.Dispatch<React.SetStateAction<T>>;
  upsert: <K extends keyof T>(key: K, value: T[K]) => void;
  remove: <K extends keyof T>(key: K) => void;
}

/**
 * @param _dict 초기 상태 값
 * @returns Dictonary, Action methods
 */
const useDict = <T extends object = any>(_dict: T = {} as T): [T, Actions<T>] => {
  const [dict, set] = useState<T>(_dict);

  const actions = useMemo<Actions<T>>(
    () => ({
      set,

      upsert: (key, value) => {
        set((prev) => ({
          ...prev,
          [key]: value,
        }));
      },

      remove: (key) => {
        set(({ [key]: _, ...rest }) => rest as T);
      },
    }),
    []
  );

  return [dict, actions];
};

export default useDict;
