import { useState } from "react";

const useList = <T>(_list: T[]) => {
  const [list, set] = useState(_list);

  
};

export default useList;
