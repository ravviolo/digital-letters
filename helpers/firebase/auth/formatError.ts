export const errorCodeToMsg = (errorCode: string) => {
  const errorMessage = errorCode.split('/')[1].split('-').join(' ');
  return errorMessage.replace(/^\w/, (char) => char.toUpperCase());
};
