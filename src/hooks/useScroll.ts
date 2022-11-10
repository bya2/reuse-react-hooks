import { off, on } from "@/misc/utils";
import { useCallback, useEffect, useState } from "react";

interface T {
  x: number;
  y: number;
}

const useScroll = <E extends HTMLElement = any>(_ref: React.RefObject<E>): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [coord, set] = useState<T>({ x: 0, y: 0 });

  const handler = useCallback(() => {
    if (_ref.current) {
      set({
        x: _ref.current.scrollLeft,
        y: _ref.current.scrollTop,
      });
    }
  }, []);

  useEffect(() => {
    if (_ref.current) {
      on(_ref.current, "scroll", handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (_ref.current) {
        off(_ref.current, "scroll", handler);
      }
    };
  }, [_ref]);

  return [coord, set];
};

export default useScroll;
