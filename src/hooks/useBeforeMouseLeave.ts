import { useEffect } from "react";
import { on, off } from "@/misc/utils";

const useBeforeMouseLeave = <E extends HTMLElement>(onBeforeMouseLeave: () => void) => {
  const handle = (e: MouseEvent | React.MouseEvent<E>) => {
    if (e.clientX < 0 || e.clientY < 0 || e.clientX > window.outerWidth || e.clientY > window.outerHeight) onBeforeMouseLeave();
  };

  useEffect(() => {
    on(document, "mouseleave", handle);
    return () => {
      off(document, "mouseleave", handle);
    };
  });
};

export default useBeforeMouseLeave;
