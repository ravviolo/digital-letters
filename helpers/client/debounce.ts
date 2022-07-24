export const debounce = <F extends (...args: any[]) => any>(
  callback: F,
  delay: number
) => {
  let timeoutID: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => callback(...args), delay);
  };
};
