import clsx from 'clsx';
import { flags } from './config';

export const Flags = () => {
  return (
    <div className="absolute pointer-events-none top-0 left-0 bottom-0 right-0">
      {flags.map(({ position, size, style }) => (
        <div
          className={clsx(
            "absolute after:content-[''] after:bg-[url('/flags.png')] after:inline-block after:w-full after:h-full after:bg-no-repeat",
            `after:bg-[position:${position}] after:bg-[size:${size}]`,
            style
          )}
        />
      ))}
    </div>
  );
};
