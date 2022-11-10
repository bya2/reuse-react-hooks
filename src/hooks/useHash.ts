import { isBrowser, off, on } from "@/misc/utils";
import { useCallback, useEffect, useState } from "react";

const useHash = (): [string, (hash: string) => void] => {
  if (!isBrowser) {
    throw new Error();
  }

  const [hashState, setHashState] = useState(() => window.location.hash);

  const onHashChange = useCallback(() => setHashState(window.location.hash), []);

  useEffect(() => {
    on(window, "hashchange", onHashChange);
    return () => {
      off(window, "hashchange", onHashChange);
    };
  }, []);

  const setHash = useCallback(
    (hash: string) => {
      if (hash !== hashState) {
        window.location.hash = hashState;
      }
    },
    [hashState]
  );

  return [hashState, setHash];
};

export default useHash;
