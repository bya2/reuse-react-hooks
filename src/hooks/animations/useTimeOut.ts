import useTimeOutFn from "./useTimeOutFn";
import useUpdate from "./useUpdate";

const useTimeOut = (ms: number = 0) => {
  const update = useUpdate();
  return useTimeOutFn(update, ms);
};

export default useTimeOut;
