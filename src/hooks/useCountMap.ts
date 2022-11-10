import { useMemo, useState } from "react";

interface Actions<K> {
  set: React.Dispatch<React.SetStateAction<Map<K, number>>>;
  inc: (key: K, step: number) => void;
  dec: (key: K, step: number) => void;
  reset: (key?: K) => void;
}

interface CountOptions {
  minimum?: number;
  maximum?: number;
  step?: number;
}

const useCountMap = <K>(_mapOrList: Map<K, number> | K[], _range: CountOptions): [Map<K, number>, Actions<K>] => {
  const [map, set] = useState<Map<K, number>>(() => {
    if (_mapOrList instanceof Array) {
      return _mapOrList.reduce((map, k) => {
        map.set(k, _range.minimum || 0);
        return map;
      }, new Map<K, number>());
    }
    return _mapOrList;
  });

  const actions = useMemo<Actions<K>>(
    () => ({
      set,
      inc(key, step = _range.step || 1) {
        set((prev) => {
          if (prev.has(key)) {
            let nVal = prev.get(key)! + step;
            if (_range.minimum && nVal < _range.minimum) nVal = _range.minimum;
            if (_range.maximum && nVal > _range.maximum) nVal = _range.maximum;
            prev.set(key, nVal);
          }
          return prev;
        });
      },
      dec(key, step) {
        set((prev) => {
          if (prev.has(key)) {
            let nVal = prev.get(key)! - step;
            if (_range.minimum && nVal < _range.minimum) nVal = _range.minimum;
            if (_range.maximum && nVal > _range.maximum) nVal = _range.maximum;
            prev.set(key, nVal);
          }
          return prev;
        });
      },
      reset(key?) {
        if (typeof key === "undefined") {
          set(() => {
            if (_mapOrList instanceof Array) {
              return _mapOrList.reduce((map, k) => {
                map.set(k, _range.minimum || 0);
                return map;
              }, new Map<K, number>());
            }
            return _mapOrList;
          });
        } else {
        }
      },
    }),
    []
  );

  return [map, actions];
};

export default useCountMap;
