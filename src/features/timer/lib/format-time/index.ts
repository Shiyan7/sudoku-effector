const padZero = (value: number) => {
  return value.toLocaleString('en-US', { minimumIntegerDigits: 2 });
};

export const formatTime = (time: number) => {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return `${padZero(minutes)}:${padZero(seconds)}`;
};
