import { useReducer } from "react";

const updateReducer = (num: number) => (num + 1) % 1_000_000;

const useUpdate = (): (() => void) => {
  const [, dispatch] = useReducer(updateReducer, 0);
  return dispatch;
};

export default useUpdate;
