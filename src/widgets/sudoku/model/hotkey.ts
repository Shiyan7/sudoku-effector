import { createEvent, sample } from 'effector';
import { hotkey } from 'effector-hotkey';

const keys = Array.from({ length: 9 }, (_, v) => v + 1).join('+');

const keyPressed = hotkey({ key: keys });

export const numberPressed = createEvent<{ key: string }>();

sample({
  clock: [keyPressed, numberPressed],
  fn: ({ key }) => console.log(key),
});
