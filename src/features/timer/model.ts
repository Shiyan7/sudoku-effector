import { createStore, createEvent, sample } from 'effector';
import { interval } from 'patronum';
import { formatTime } from './lib';

export const startTimer = createEvent();
export const stopTimer = createEvent();

export const $time = createStore(0);
export const $formattedTime = createStore('00:00');

const { tick, isRunning } = interval({
  timeout: 1000,
  start: startTimer,
  stop: stopTimer,
});

$time.on(tick, (state) => state + 1);

sample({
  source: $time,
  fn: (time) => formatTime(time),
  target: $formattedTime,
});

export { isRunning };
