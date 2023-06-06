import { Icon } from '@/shared/ui';
import { items } from './config';

export const Actions = () => {
  return (
    <div className="flex items-center justify-center md:justify-between w-full mb-12 md:mb-3">
      {items.map(({ label, iconName }) => (
        <button key={label} className="not-last:mr-9 md:not-last:mr-0 text-gray-400 md:text-blue-100">
          <div className="flex items-center justify-center md:w-14 md:h-14 rounded-full md:bg-blue-400">
            <Icon className="flex w-8 h-8" name={iconName} />
          </div>
          <span className="text-[12px] leading-[12px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};
