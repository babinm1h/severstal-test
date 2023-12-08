import { EffectCallback, useEffect, useRef } from 'react';

export const useSkipMountEffect = (effect: EffectCallback, dependencies: unknown[]) => {
  const isMmounted = useRef(false);

  useEffect(() => {
    if (isMmounted.current) {
      effect();
    } else {
      isMmounted.current = true;
    }
  }, dependencies);

  useEffect(() => {
    return () => {
      isMmounted.current = false;
    };
  }, []);
};
