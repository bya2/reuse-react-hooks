import { useCallback, useEffect, useState } from "react";

// 목적: 에러 발생, 에러 메세지 캡슐화

interface ErrorOptions {
  isDebugger?: boolean;
}

export const handleError = (err: Error, errOpts: ErrorOptions) => {
  let message = "";
  for (const [optKey, optVal] of Object.entries(err)) {
    message += `${optKey}: ${optVal}\n`;
  }
  console.error(message);

  if (errOpts?.isDebugger) {
    debugger;
  }
};

const useError = (): ((err: Error) => void) => {
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (error) {
      throw error;
    }
  }, [error]);

  const dispatchError = useCallback((err: Error) => {
    setError(err);
  }, []);

  return dispatchError;
};

export default useError;
