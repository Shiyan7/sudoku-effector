import { createStore, createEvent } from 'effector';

export const toggleTimer = createEvent();
export const $isRunning = createStore(true);

$isRunning.on(toggleTimer, (state) => !state);
