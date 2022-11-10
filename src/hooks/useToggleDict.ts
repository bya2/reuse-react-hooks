import { useMemo, useState } from "react";

interface Actions<T> {
  set: React.Dispatch<React.SetStateAction<T>>;
  update: <K extends keyof T>(key: K) => void;
  remove: <K extends keyof T>(key: K) => void;
}

const useToggleDict = <T extends { [key: string]: boolean }>(_dict: T = {} as T): [T, Actions<T>] => {
  const [dict, set] = useState<T>(_dict);

  const actions = useMemo<Actions<T>>(
    () => ({
      set,

      update: (key) => {
        set((prev) => ({
          ...prev,
          [key]: !prev[key],
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

export default useToggleDict;
