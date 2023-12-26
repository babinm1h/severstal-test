import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';

export const DebouncedEffect = () => {
  const [val, setVal] = useState('');

  const debouncedVal = useDebouncedEffect(val, 500);

  console.log({ val, debouncedVal });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVal(e.target.value);
  };

  return (
    <div>
      <input type="text" value={val} onChange={handleChange} placeholder="debounced" />
    </div>
  );
};

export const useDebouncedEffect = (val: any, time: number) => {
  const [debouncedValue, setDebouncedValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(val);
    }, time);

    return () => {
      clearTimeout(timer);
    };
  }, [time, val]);

  return debouncedValue;
};

export const usePrevious = (val: any) => {
  const prevRef = useRef(val);

  useEffect(() => {
    prevRef.current = val;
  }, [val]);

  return prevRef;
};

export const useLatest = (val: any) => {
  const latestRef = useRef(val);

  useLayoutEffect(() => {
    latestRef.current = val;
  }, [val]);

  return latestRef;
};
