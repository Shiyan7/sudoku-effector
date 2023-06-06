export interface SpritesMap {
  actions: 'bulb' | 'cancel' | 'clear' | 'pen';
  common: 'add' | 'chevron' | 'pause' | 'play';
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  actions: ['bulb', 'cancel', 'clear', 'pen'],
  common: ['add', 'chevron', 'pause', 'play'],
};
