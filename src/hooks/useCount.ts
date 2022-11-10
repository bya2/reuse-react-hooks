import { useMemo, useState } from "react";

interface Actions {
  inc: (val: number) => void;
  dec: (val: number) => void;
  reset: () => void;
}

interface CountOptions {
  minimum?: number;
  maximum?: number;
  step?: number;
}

const useCount = (_initialValue: number, _range: CountOptions): [number, Actions] => {
  const [state, set] = useState(_initialValue);

  const actions = useMemo<Actions>(
    () => ({
      inc: (step = _range.step || 1) => {
        set((prev) => {
          let nVal = prev + step;
          if (_range.minimum && nVal < _range.minimum) nVal = _range.minimum;
          if (_range.maximum && nVal > _range.maximum) nVal = _range.maximum;
          return nVal;
        });
      },

      dec: (step = _range.step || 1) => {
        set((prev) => {
          let nVal = prev - step;
          if (_range.minimum && nVal < _range.minimum) nVal = _range.minimum;
          if (_range.maximum && nVal > _range.maximum) nVal = _range.maximum;
          return nVal;
        });
      },

      reset: () => {
        set(_initialValue);
      },
    }),
    []
  );

  return [state, actions];
};

export default useCount;
