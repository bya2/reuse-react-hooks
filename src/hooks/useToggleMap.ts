import { useMemo, useState } from "react";

interface Actions<K> {
  set: React.Dispatch<React.SetStateAction<Map<K, boolean>>>;
  on: (key: K) => void;
  off: (key: K) => void;
  turn: (key: K) => void;
  delete: (key: K) => void;
}

/**
 * @param _map
 * @returns Map, Action methods
 */
const useToggleMap = <K>(_map: Map<K, boolean>): [Map<K, boolean>, Actions<K>] => {
  const [state, set] = useState<Map<K, boolean>>(_map);

  const actions = useMemo<Actions<K>>(
    () => ({
      set,

      on: (key) => {
        set((prev) => new Map(prev).set(key, true));
      },

      off: (key) => {
        set((prev) => new Map(prev).set(key, false));
      },

      turn: (key) => {
        set((prev) => new Map(prev).set(key, !prev.get(key)));
      },

      delete: (key) => {
        set((prev) => {
          const map = new Map(prev);
          map.delete(key);
          return map;
        });
      },
    }),
    []
  );

  return [state, actions];
};

export default useToggleMap;
