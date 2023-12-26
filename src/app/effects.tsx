import React, { useEffect, useLayoutEffect, useState } from 'react';


const state = 1;

/**
 ========== БЕЗ CHILD
        PARENT LOG
        parent layout1
        parent effect1
        parent effect2
        
        PARENT LOG
        parent layout1 cleanup
        parent layout1
        parent effect1 cleanup
        parent effect2 cleanup
        parent effect1
        parent effect2
 */

/**
 *  ========== С CHILD и state в зависимостях
 * parlog childlog childlayout1 parentlayout1 childeffect1 childeffect2 parenteffect1 parenteffect2
 * parlog childlog childlayoutcleanup parentlayoutcleanup chlayout1 parlayout1 cheffect1clean cheffect2clean pareffect1clean pareffect2clean cheff1 cheff2 pareff1 pareff2
 */
export const Effects = () => {
  console.log('PARENT LOG');
  const [state, setState] = useState(0);

  useEffect(() => {
    setState((s) => s + 1);
  }, []);

  useEffect(() => {
    console.log('parent effect1');

    return () => {
      console.log('parent effect1 cleanup');
    };
  }, [state]);

  useEffect(() => {
    console.log('parent effect2');

    return () => {
      console.log('parent effect2 cleanup');
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log('parent layout1');

    return () => {
      console.log('parent layout1 cleanup');
    };
  }, [state]);

  return (
    <div>
      <Child state={state} />
    </div>
  );
};

const Child = ({ state }: any) => {
  console.log('CHILD LOG');

  useEffect(() => {
    console.log('child effect1');

    return () => {
      console.log('child effect1 cleanup');
    };
  }, [state]);

  useEffect(() => {
    console.log('child effect2');

    return () => {
      console.log('child effect2 cleanup');
    };
  }, [state]);

  useLayoutEffect(() => {
    console.log('child layout1');

    return () => {
      console.log('child layout1 cleanup');
    };
  }, [state]);

  return <div></div>;
};
