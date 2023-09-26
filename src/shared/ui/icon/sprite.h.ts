export interface SpritesMap {
  actions: 'bulb' | 'cancel' | 'clear' | 'pen';
  common: 'add' | 'chevron' | 'pause' | 'play' | 'settings' | 'stats' | 'sudoku' | 'time';
}
export const SPRITES_META = {
  actions: ['bulb', 'cancel', 'clear', 'pen'],
  common: ['add', 'chevron', 'pause', 'play', 'settings', 'stats', 'sudoku', 'time'],
} satisfies {
  actions: Array<'bulb' | 'cancel' | 'clear' | 'pen'>;
  common: Array<'add' | 'chevron' | 'pause' | 'play' | 'settings' | 'stats' | 'sudoku' | 'time'>;
};
