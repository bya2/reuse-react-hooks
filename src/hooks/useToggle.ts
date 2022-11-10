import { useState } from "react";

const useToggle = (_value: boolean) => {
  const [state, set] = useState(_value);

  const turn = () => set((prev) => !prev);

  return [state, turn];
};

export default useToggle;
