import { useMemo, useState } from "react";

interface Actions<T extends object> {
  set: (dir: T) => void;
  upsert: <K extends keyof T>(key: K, value: T[K]) => void;
  remove: <K extends keyof T>(key: K) => void;
}

const useDir = <T extends object>(initDir: T = {} as T): [T, Actions<T>] => {
  const [state, set] = useState<T>(initDir);

  const actions = useMemo<Actions<T>>(
    () => ({
      set: (dir) => {
        set(dir);
      },
      upsert: (key, value) => {
        set((prev) => ({ ...prev, [key]: value }));
      },
      remove: (key) => {
        set((prev) => {
          const { [key]: omit, ...rest } = prev;
          return rest as T;
        });
      },
    }),
    []
  );

  return [state, actions];
};

export default useDir;
