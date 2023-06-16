export type Difficulty = 'easy' | 'medium' | 'hard' | 'expert';

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
