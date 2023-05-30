export interface SpritesMap {
  common: 'chevron';
  other: 'arrow';
}

export const SPRITES_META: { [K in keyof SpritesMap]: SpritesMap[K][] } = {
  common: ['chevron'],
  other: ['arrow'],
};
