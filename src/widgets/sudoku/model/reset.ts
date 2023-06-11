import { reset } from 'patronum';
import { timerModel } from '@/features/timer';
import { newGameStarted } from './start';
import { $countMistakes, $isLoss, $isWin, secondChanceClicked, startAgainClicked } from './status';
import { $mistakes } from './mistakes';
import { $selectedCell } from './cell';

reset({
  clock: newGameStarted,
  target: [timerModel.$time, $selectedCell],
});

reset({
  clock: [secondChanceClicked, startAgainClicked, newGameStarted],
  target: [$isLoss, $isWin],
});

reset({
  clock: [startAgainClicked, newGameStarted],
  target: [$countMistakes, $mistakes],
});
