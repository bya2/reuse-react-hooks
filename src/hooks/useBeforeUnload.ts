import { on, off } from "@/misc/utils";

const eType = "beforeunload";

/**
 * Before unload event hook
 * - beforeunload: 브라우저 닫을 시 한번 더 그 의사를 재차 묻고 싶을때 사용하는 이벤트
 * @param _message
 */
const useBeforeUnload = (_message: string = "") => {
  const handler = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = _message;
  };

  const enable = () => {
    return on(window, eType, handler);
  };

  const disable = () => {
    return off(window, eType, handler);
  };

  return [enable, disable];
};

export default useBeforeUnload;
