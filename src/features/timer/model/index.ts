import { createStore, createEvent, sample } from 'effector';
import { interval } from 'patronum';
import { formatTime } from '../lib';
import { atom } from '@/shared/lib';

export const timerModel = atom(() => {
  const startTimer = createEvent();
  const stopTimer = createEvent();
  const $time = createStore(0);
  const $formattedTime = createStore('00:00');

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

  return {
    startTimer,
    stopTimer,
    $time,
    $formattedTime,
    isRunning,
  };
});
