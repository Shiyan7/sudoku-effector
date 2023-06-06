export interface SpritesMap {
  actions: 'bulb' | 'cancel' | 'clear' | 'pen';
  common: 'chevron' | 'pause' | 'play' | 'add';
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  actions: ['bulb', 'cancel', 'clear', 'pen'],
  common: ['chevron', 'pause', 'play', 'add'],
};
