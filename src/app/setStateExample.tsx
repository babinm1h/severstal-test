import { Button } from '@/shared/components/Button';
import React, { useEffect, useState } from 'react';

const SetStateExample = () => {
  const [state, setState] = useState({ count: 0 });

  const onClick = () => {
    // ПРИ КЛИКЕ НЕ БУДЕТ ВЫЗЫВАТЬСЯ РЕРЕНДЕР, ТАК КАК В SETSTATE ВОЗВРАЩАЕТСЯ ССЫЛКА НА ТОТ ЖЕ ОБЬЕКТ И COUNT В JSX ВСЕГДА БУДЕТ 0
    setState((prev) => {
      const newState = prev;
      newState.count += 1;
      return newState;
    });
  };

  useEffect(() => {
    // USEFFECT НЕ БУДЕТ ВЫЗЫВАТЬСЯ Т.К ССЫЛКА НА STATE НЕ МЕНЯЕТСЯ
    if (!state.count) return;
    console.log('STATE CHANGED!!');
  }, [state]);

  const handleTimeout = async () => {
    const timerPromise = new Promise((res) => {
      setTimeout(() => {
        return res('timer value');
      }, 2000);
    });

    const count = await timerPromise;
    console.log(count);
  };

  return (
    <div>
      <Button onClick={onClick}>count: {state.count}</Button>
      <Button onClick={handleTimeout}>await</Button>
    </div>
  );
};

export default SetStateExample;
