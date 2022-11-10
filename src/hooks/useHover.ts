import { useState, cloneElement } from "react";

type Element<E extends HTMLElement> = React.DetailedReactHTMLElement<React.HTMLAttributes<E>, E>;
type HoverElement<E extends HTMLElement> = ((state: boolean) => Element<E>) | Element<E>;
type HoverEventHandler<E> = React.MouseEventHandler<E>;
type HoverEvent<E> = React.MouseEvent<E>;

/**
 * @param _element Hook을 적용할 리액트 HTML 요소
 * @return State, React element
 */
const useHover = <E extends HTMLElement = any>(_element: HoverElement<E>): [boolean, React.DetailedReactHTMLElement<React.HTMLAttributes<E>, E>] => {
  const [hoverState, setHoverState] = useState(false);

  /**
   * @param originalOnMouseEvent 원래 마우스 이벤트 처리 함수
   * @param isEnter 이벤트에 따라 설정할 호버 상태 값
   */
  const onMouseEvent = (originalOnMouseEvent: HoverEventHandler<E> | undefined, isEnter: boolean) => (e: HoverEvent<E>) => {
    originalOnMouseEvent?.(e);
    setHoverState(isEnter);
  };

  if (typeof _element === "function") {
    _element = _element(hoverState);
  }

  const el = cloneElement(_element, {
    onMouseEnter: onMouseEvent(_element.props.onMouseEnter, true),
    onMouseLeave: onMouseEvent(_element.props.onMouseLeave, false),
  });

  return [hoverState, el];
};

export default useHover;
