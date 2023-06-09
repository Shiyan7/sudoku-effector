import { createEvent, createStore } from 'effector';

export const $history = createStore<string[]>([]);

export const sendHistory = createEvent<string>();

export const backwardClicked = createEvent();

$history.on(backwardClicked, (state) => state.slice(0, -1));
$history.on(sendHistory, (state, payload) => [...state, payload]);

$history.watch(console.log);
