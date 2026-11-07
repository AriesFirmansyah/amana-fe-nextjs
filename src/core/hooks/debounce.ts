import { useEffect, useState } from "react";

export const useDebouncedValue = <TState>(value: TState, delay: number) => {
  const [state, setState] = useState(value);
  useEffect(() => {
    const t = setTimeout(setState, delay, value);
    return () => {
      clearTimeout(t);
    };
  }, [value, delay]);
  return state;
};
