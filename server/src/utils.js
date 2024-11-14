const trimStr = (str) => str.trim().toLowerCase();

const getNowDate = () => {
  const date = new Date(Date.now());
  const pad = (n) => (n < 10 ? `0${n}` : n);

  const hours = pad(date.getUTCHours());
  const minutes = pad(date.getUTCMinutes());
  const seconds = pad(date.getUTCSeconds());

  return `${hours}:${minutes}:${seconds}`;
};

module.exports = { trimStr, getNowDate };