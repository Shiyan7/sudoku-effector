export interface SpritesMap {
  common: 'chevron' | 'pause' | 'play';
  other: 'arrow';
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  common: ['chevron', 'pause', 'play'],
  other: ['arrow'],
};
