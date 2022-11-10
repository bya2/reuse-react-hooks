import { useMemo, useState } from "react";

interface Actions<K, V> {
  set: React.Dispatch<React.SetStateAction<Map<K, V>>>;
  add: (key: K, value: V) => void;
  upsert: (key: K, value: V) => void;
  delete: (key: K) => void;
}

/**
 * Map hook
 * @param _map
 * @returns [map, actions]
 */
const useMap = <K = any, V = any>(_map: Map<K, V>): [Map<K, V>, Actions<K, V>] => {
  const [map, set] = useState<Map<K, V>>(_map);

  const actions = useMemo<Actions<K, V>>(
    () => ({
      set,

      add: (key, value) => {
        set((prev) => new Map([...prev, [key, value]]));
      },

      upsert: (key, value) => {
        set((prev) => new Map(prev).set(key, value));
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

  return [map, actions];
};

export default useMap;
