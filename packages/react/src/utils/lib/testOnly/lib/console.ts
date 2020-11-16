// when expect errors to be thrown, do not allow errors to be printed
export const overrideError = () => {
  const logError = console.error;
  console.error = () => void 0;
  return () => {
    console.error = logError;
  };
};
