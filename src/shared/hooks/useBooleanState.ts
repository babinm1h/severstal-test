import { useCallback, useState } from 'react';

export const useBooleanState = (initialValue = false) => {
  const [isTrue, setIsTrue] = useState(initialValue);

  const setTrue = useCallback(() => {
    setIsTrue(true);
  }, []);

  const setFalse = useCallback(() => {
    setIsTrue(false);
  }, []);

  const toggleValue = useCallback(() => {
    setIsTrue((prev) => !prev);
  }, []);

  return { setFalse, setTrue, isTrue, toggleValue };
};
