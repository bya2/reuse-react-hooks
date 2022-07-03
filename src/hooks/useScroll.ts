import { off, on } from "@/misc/utils";
import { RefObject, useEffect, useState } from "react";

interface State {
  x: number;
  y: number;
}

const useScroll = (ref: RefObject<HTMLElement>): State => {
  const [state, set] = useState<State>({ x: 0, y: 0 });

  useEffect(() => {
    const scrollListener = () => {
      if (ref.current) {
        set({
          x: ref.current.scrollLeft,
          y: ref.current.scrollTop,
        });
      }
    };

    if (ref.current) {
      on(ref.current, "scroll", scrollListener, { capture: false, passive: true });
    }

    return () => {
      if (ref.current) {
        off(ref.current, "scroll", scrollListener);
      }
    };
  }, [ref]);

  return state;
};

export default useScroll;
