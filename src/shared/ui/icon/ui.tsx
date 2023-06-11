import clsx from 'clsx';
import { SVGProps } from 'react';
import { SpritesMap } from './sprite.h';

export type IconName = {
  [Key in keyof SpritesMap]: `${Key}/${SpritesMap[Key]}`;
}[keyof SpritesMap];

export interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name' | 'type'> {
  name: IconName;
}

export function Icon({ name, className, viewBox, ...props }: IconProps) {
  const [spriteName, iconName] = name.split('/');

  return (
    <svg className={clsx('icon', className)} viewBox={viewBox} focusable="false" aria-hidden {...props}>
      <use xlinkHref={`/sprites/${spriteName}.svg#${iconName}`} />
    </svg>
  );
}
