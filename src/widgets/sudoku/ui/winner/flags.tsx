import clsx from 'clsx';
import { flags } from './config';

export const Flags = () => {
  return (
    <div className="absolute pointer-events-none top-0 left-0 bottom-0 right-0">
      {flags.map(({ style }, idx) => (
        <div
          key={idx}
          className={clsx(
            "absolute after:content-[''] after:bg-[url('/flags.png')] after:inline-block after:w-full after:h-full after:bg-no-repeat",
            style
          )}
        />
      ))}
    </div>
  );
};
