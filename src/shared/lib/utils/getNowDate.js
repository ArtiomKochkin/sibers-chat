export const getNowDate = () => {
  const date = new Date(Date.now());
  const pad = (n) => (n < 10 ? `0${n}` : n);

  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());
  const seconds = pad(date.getSeconds());

  return `${hours}:${minutes}:${seconds}`;
};