import { Reducer, useReducer } from "react";

const toggleReducer = (currState: boolean, nextState?: boolean): boolean => nextState ?? !currState;

const useToggle = (initValue: boolean = false) => {
  return useReducer<Reducer<boolean, any>>(toggleReducer, initValue);
};

export default useToggle;
