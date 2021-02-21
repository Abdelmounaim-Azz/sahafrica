import { useEffect, useCallback } from "react";
export function pressKey(state, setState) {
  const keyPress = useCallback(
    (e) => {
      if (e.key === "Escape" && state) {
        setState(false);
      }
    },
    [setState, state]
  );
  useEffect(() => {
    document.addEventListener("keydown", keyPress);
    return () => document.removeEventListener("keydown", keyPress);
  }, [keyPress]);
}
