import { useState, useEffect } from "react";
export const useLocalState = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    if (typeof window !== "undefined") {
      const storedValue = localStorage.getItem(key);
      return storedValue === null ? defaultValue : JSON.parse(storedValue);
    }
  });

  useEffect(() => {
    const listener = (e) => {
      if (e.storageArea === localStorage && e.key === key) {
        setValue(JSON.parse(e.newValue));
      }
    };
    window.addEventListener("storage", listener);

    return () => {
      window.removeEventListener("storage", listener);
    };
  }, [key]);

  useEffect(() => {
    const bodyTag = document.getElementsByTagName("BODY")[0];
    bodyTag.setAttribute(
      "data-theme",
      JSON.parse(localStorage.getItem("theme"))
    );
  }, []);

  const setValueInLocalStorage = (newValue) => {
    if (typeof window !== "undefined") {
      setValue((currentValue) => {
        const result =
          typeof newValue === "function" ? newValue(currentValue) : newValue;
        localStorage.setItem(key, JSON.stringify(result));
        return result;
      });
    }
  };

  return [value, setValueInLocalStorage];
};
