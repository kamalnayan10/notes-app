import { useEffect, useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const storedState = JSON.parse(localStorage.getItem(key));
    return storedState || defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

export default useLocalStorage;
