export const debounce = (cb: (...args: any[]) => unknown, ms: number) => {
  let timer: NodeJS.Timeout;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      cb.apply(this, args);
    }, ms);
  };
};
