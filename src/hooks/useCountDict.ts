import { useMemo, useState } from "react";

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

const useCountDict = <K extends keyof T = string>(_dictOrList: T | K[], _range: CountOptions = {}): [T, Actions<T>] => {
  const [dict, set] = useState<T>(() => {
    if (_dictOrList instanceof Array) {
      return _dictOrList.reduce((obj, t) => {
        obj[t] = typeof _range.minimum === "number" ? _range.minimum : 0;
        return obj;
      }, {} as T);
    }
    return _dictOrList;
  });

  const actions = useMemo<Actions<T>>(
    () => ({
      set,
      inc(key: K, step = _range.step || 1) {
        set((prev) => {
          let nVal = prev[key] + step;
          if (_range.minimum && nVal < _range.minimum) nVal = _range.minimum;
          if (_range.maximum && nVal > _range.maximum) nVal = _range.maximum;
          return {
            ...prev,
            [key]: nVal,
          };
        });
      },

      dec(key: K, step = _range.step || 1) {
        set((prev) => {
          let nVal = prev[key] - step;
          if (_range.minimum && nVal < _range.minimum) nVal = _range.minimum;
          if (_range.maximum && nVal > _range.maximum) nVal = _range.maximum;
          return {
            ...prev,
            [key]: nVal,
          };
        });
      },

      reset(key?: K) {
        if (typeof key === "undefined") {
          set(() => {
            if (_dictOrList instanceof Array) {
              return _dictOrList.reduce((obj, t) => {
                obj[t] = typeof _range.minimum === "number" ? _range.minimum : 0;
                return obj;
              }, {} as T);
            }
            return _dictOrList;
          });
        } else {
          set((prev) => {
            return {
              ...prev,
              [key]: _dictOrList instanceof Array ? _range.minimum || 0 : _dictOrList[key],
            };
          });
        }
      },
    }),
    []
  );

  return [dict, actions];
};

export default useCountDict;
