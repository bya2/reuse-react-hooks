import { useMemo, useState } from "react";

interface Actions<K, V> {
  add: (key: K, value: V) => void;
  upsert: (key: K, value: V) => void;
  remove: (key: K) => void;
}

const useMap = <K, V>(initMap: Map<K, V> = new Map()): [Map<K, V>, Actions<K, V>] => {
  const [state, set] = useState<Map<K, V>>(initMap);

  const actions = useMemo<Actions<K, V>>(
    () => ({
      add: (key, value) => {
        set((prev) => new Map([...prev, [key, value]]));
      },

      upsert: (key, value) => {
        set((prev) => new Map(prev).set(key, value));
      },

      remove: (key) => {
        set((prev) => {
          const tmp = new Map(prev);
          tmp.delete(key);
          return tmp;
        });
      },
    }),
    []
  );

  return [state, actions];
};

export default useMap;
