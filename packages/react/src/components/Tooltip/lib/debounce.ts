// eslint-disable-next-line
export function debounce<Args extends any[]>(
  // eslint-disable-next-line
  fn: (...args: Args) => any,
  delay: number = 0
) {
  let timer: number = 0;
  const innerDebounce = (...args: Args) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = window.setTimeout(() => fn(...args), delay);
  };
  innerDebounce.cancel = () => clearTimeout(timer);
  return innerDebounce;
}
