import { noop } from "@/misc/utils";

const useConfirm = (_message: string = "", _callbackFn: () => void = noop, _rejectFn: () => void = noop) => {
  return () => {
    if (confirm(_message)) _callbackFn();
    else _rejectFn();
  };
};

export default useConfirm;
