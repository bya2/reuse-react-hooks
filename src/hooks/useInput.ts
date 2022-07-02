import React, { useMemo, useState } from "react";

type changeE = React.ChangeEvent<HTMLInputElement>;
type focusE = React.FocusEvent<HTMLInputElement>;

interface Actions {
  onChange: (e: changeE) => void;
  reset: () => void;
}

const useInput = (initValue: string = ""): [string, Actions] => {
  const [state, set] = useState<string>(initValue);

  const actions = useMemo<Actions>(
    () => ({
      onChange: (e) => {
        e.stopPropagation();
        set(e.currentTarget.value);
      },

      reset: () => {
        set(initValue);
      },
    }),
    []
  );

  return [state, actions];
};

export default useInput;
