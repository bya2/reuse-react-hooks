import { useMemo, useState } from "react";
import Dict from "@/models/Dict";

interface Actions<T, K extends keyof T = any> {
  set: React.Dispatch<React.SetStateAction<T>>;
  inc: (key: K, step: number) => void;
  dec: (key: K, step: number) => void;
  reset: (key?: K) => void;
}

interface CountOptions {
  minimum?: number;
  maximum?: number;
  step?: number;
}

interface T {
  [key: string]: number;
}

const useCountDict = <K extends keyof T = string>(_dictOrList: T | K[], _rangeOptions: CountOptions = {}): [T, Actions<T>] => {
  const [dict, set] = useState<T>(() => {
    if (_dictOrList instanceof Array) {
      const initialValue = typeof _rangeOptions.minimum === "number" ? _rangeOptions.minimum : 0;
      return Dict.from(_dictOrList, initialValue);
    } else {
      return _dictOrList;
    }
  });

  const actions = useMemo<Actions<T>>(
    () => ({
      set,
      inc(key: K, step = _rangeOptions.step || 1) {
        set((prev) => {
          let nVal = prev[key] + step;
          if (_rangeOptions.minimum && nVal < _rangeOptions.minimum) nVal = _rangeOptions.minimum;
          if (_rangeOptions.maximum && nVal > _rangeOptions.maximum) nVal = _rangeOptions.maximum;
          return Dict.upserted<T>(key, nVal)(prev);
        });
      },

      dec(key: K, step = _rangeOptions.step || 1) {
        set((prev) => {
          let nVal = prev[key] - step;
          if (_rangeOptions.minimum && nVal < _rangeOptions.minimum) nVal = _rangeOptions.minimum;
          if (_rangeOptions.maximum && nVal > _rangeOptions.maximum) nVal = _rangeOptions.maximum;
          return Dict.upserted<T>(key, nVal)(prev);
        });
      },

      reset(key?: K) {
        if (typeof key === "undefined") {
          set(() => {
            if (_dictOrList instanceof Array) {
              const initialValue = typeof _rangeOptions.minimum === "number" ? _rangeOptions.minimum : 0;
              return Dict.from(_dictOrList, initialValue);
            } else {
              return _dictOrList;
            }
          });
        } else {
          set(Dict.upserted(key, _dictOrList instanceof Array ? _rangeOptions.minimum || 0 : _dictOrList[key]));
        }
      },
    }),
    []
  );

  return [dict, actions];
};

export default useCountDict;
