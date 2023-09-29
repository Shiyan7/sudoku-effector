import { reset } from 'patronum';
import { timerModel } from '@/features/timer';
import { newGameStarted } from './start';
import { $countMistakes, $isLoss, $isWin, $mistakes, secondChanceClicked, startAgainClicked } from './status';
import { $selectedCell } from './cell';
import { $isNotesEnabled, $arrayOfNotes } from './notes';
import { $history } from './history';

reset({
  clock: newGameStarted,
  target: [timerModel.$time, $selectedCell, $isNotesEnabled],
});

reset({
  clock: [secondChanceClicked, startAgainClicked, newGameStarted],
  target: [$isLoss, $isWin],
});

reset({
  clock: [startAgainClicked, newGameStarted],
  target: [$countMistakes, $mistakes, $history, $arrayOfNotes],
});
