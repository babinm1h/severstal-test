import { Button } from '@/shared/components/Button';
import React, { useState } from 'react';

/**
 * Когда state === true и мы ставим setState(true), то console.log() сработает только в первый раз, не вызовет ререндер дочерних компонентов.
 * React'у необходимо вызвать этот повторный рендер, из-за какого то механизма Fiber
 */

export const SameSetState = () => {
  const [state, setState] = useState(false);

  console.log('SameSetState value', state);

  return (
    <Button onClick={() => setState(true)}>
      always set true <SameSetStateChild />
    </Button>
  );
};

export const SameSetStateChild = () => {
  console.log('SameSetStateChild render');

  return null;
};
