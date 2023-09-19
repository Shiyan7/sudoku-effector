import { Difficulty } from 'sudoku-toolbox/types';

type DifficultyItem = {
  type: Difficulty;
  label: string;
};

export const difficultyItems: DifficultyItem[] = [
  { type: 'easy', label: 'Лёгкий' },
  { type: 'medium', label: 'Средний' },
  { type: 'hard', label: 'Сложный' },
  { type: 'expert', label: 'Экспертный' },
];
