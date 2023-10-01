export interface SpritesMap {
  actions: 'bulb' | 'cancel' | 'clear' | 'pen';
  common: 'add' | 'chevron' | 'moon' | 'pause' | 'play' | 'settings' | 'stats' | 'sun' | 'time';
}
export const SPRITES_META = {
  actions: ['bulb', 'cancel', 'clear', 'pen'],
  common: ['add', 'chevron', 'moon', 'pause', 'play', 'settings', 'stats', 'sun', 'time'],
} satisfies {
  actions: Array<'bulb' | 'cancel' | 'clear' | 'pen'>;
  common: Array<'add' | 'chevron' | 'moon' | 'pause' | 'play' | 'settings' | 'stats' | 'sun' | 'time'>;
};
