import React, { useMemo, useState } from "react";

type Validator = (value: string) => boolean;

declare namespace E {}

type ChangeE = React.ChangeEvent<HTMLInputElement>;
type KeyboardE = React.KeyboardEvent<HTMLInputElement>;

interface AA {
  onKeyDown: (e: KeyboardE) => void;
  onKeyPress: (e: KeyboardE) => void;
  onInput: (e: ChangeE) => void;
  onChnage: (e: ChangeE) => void;
  onKeyUp: (e: KeyboardE) => void;
}

interface Actions {
  handleChange: (e: ChangeE) => void;
  reset: () => void;
  clear: () => void;
}

/**
 * @param _value HTML Input 요소의 초깃값
 * @param _validator Input 값의 유효성 검증 콜백 함수
 * @returns
 */
const useInput = (_value: string = "", _validator?: Validator): [string, React.Dispatch<React.SetStateAction<string>>, Actions] => {
  const [val, set] = useState(_value);

  const actions = useMemo<Actions>(
    () => ({
      handleChange: (e: ChangeE) => {
        e.stopPropagation();
        const val = e.currentTarget.value;
        let isValid = true;
        if (typeof _validator === "function") isValid = _validator(val);
        if (isValid) set(val);
      },

      reset: () => {
        set(_value);
      },

      clear: () => {
        set("");
      },
    }),
    []
  );

  const handle = {
    keyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
    },

    keyPress: (e: React.KeyboardEvent<HTMLInputElement>) => {},

    // 값이 할당되었고 화면에 보이지 않는 시점
    input: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

      const {
        currentTarget: { value },
      } = e;

      let isValid = true;
      if (typeof _validator === "function") isValid = _validator(value);
      if (isValid) set(value);
    },

    change: (e: React.ChangeEvent<HTMLInputElement>) => {
      e.stopPropagation();

      const {
        currentTarget: { value },
      } = e;

      let isValid = true;
      if (typeof _validator === "function") isValid = _validator(value);
      if (isValid) set(value);
    },

    // 값이 할당되었고 화면에 보이는 시점
    keyUp: (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.stopPropagation();
    },

    clear: () => {
      set(_value);
    },
  };

  return [val, set, actions];
};

// const onlyNumber = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   e.currentTarget.value = e.currentTarget.value.replace(/\D/g, "");
// };

// const onlyLowerCase = (e: React.KeyboardEvent<HTMLInputElement>) => {
//   e.currentTarget.value = e.currentTarget.value.replace(/[^a-z]/g, "");
// };

export default useInput;
