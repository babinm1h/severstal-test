import React, { useEffect, useRef, useState } from 'react';

/**
  undefined
  text1
 */
const Ref = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState(1);

  useEffect(() => {
    setState(2);
  }, []);

  // код еще не дошел до выполнения JSX поэтому ref = null ==> ref станет <div>text1</div> ==> при след. рендере выведется 1 т.к код не дойдет до JSX ==> при след. выведет 2
  console.log(ref.current?.textContent);

  return (
    <div>
      <div ref={state === 1 ? ref : null}>text1</div>
      <div ref={state === 2 ? ref : null}>text2</div>
    </div>
  );
};

export default Ref;
