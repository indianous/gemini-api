export const getFileName = function (): string {
  const date = new Date();
  return (
    "log-" +
    date.getFullYear().toString() +
    date.getMonth().toString() +
    date.getDay().toString() +
    date.getHours().toString() +
    date.getMinutes().toString() +
    date.getSeconds().toString() +
    ".txt"
  );
};
