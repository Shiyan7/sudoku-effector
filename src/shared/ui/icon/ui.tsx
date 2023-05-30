import { SpritesMap } from './sprite.h';

export interface IconProps<Group extends keyof SpritesMap> {
  name: SpritesMap[Group];
  type?: Group;
  className?: string;
}

export function Icon<Group extends keyof SpritesMap = 'common'>({ type, className, name }: IconProps<Group>) {
  return (
    <svg className={className}>
      <use xlinkHref={`/sprites/${type}.svg#${name}`} />
    </svg>
  );
}
