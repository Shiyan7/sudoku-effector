export interface SpritesMap {
  actions: 'bulb' | 'cancel' | 'clear' | 'pen';
  common: 'add' | 'chevron' | 'pause' | 'play' | 'stats' | 'sudoku' | 'time';
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  actions: ['bulb', 'cancel', 'clear', 'pen'],
  common: ['add', 'chevron', 'pause', 'play', 'stats', 'sudoku', 'time'],
};
