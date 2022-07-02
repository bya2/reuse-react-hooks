import { noop } from "@/misc/utils";
import { cloneElement, useState } from "react";

export type Elem<T = any> = React.ReactElement<T> | ((state: boolean) => React.ReactElement<T>);

type E = React.MouseEvent;

const useHoverElem = (_elem: Elem) => {
  const [state, set] = useState<boolean>(false);

  const onMouse = (originalOnMouseEvent: any, hoverState: boolean) => (e: E) => {
    (originalOnMouseEvent || noop)(e);
    set(hoverState);
  };

  if (typeof _elem === "function") _elem = _elem(state);

  const elem = cloneElement(_elem, {
    onMouseEnter: onMouse(_elem.props.onMouseEnter, true),
    onMouseLeave: onMouse(_elem.props.onMouseLeave, false),
  });

  return elem;
};

export default useHoverElem;
