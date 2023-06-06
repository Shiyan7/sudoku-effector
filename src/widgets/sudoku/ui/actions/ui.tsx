import { Icon } from '@/shared/ui';
import { items } from './config';

export const Actions = () => {
  return (
    <div className="flex items-center justify-between w-full mb-3">
      {items.map(({ label, iconName }) => (
        <button key={label} className="text-blue-100 group-hover:bg-blue-500">
          <div className="group flex items-center justify-center w-14 h-14 rounded-full bg-blue-400">
            <Icon className="flex w-8 h-8" name={iconName} />
          </div>
          <span className="text-[11px] leading-[12px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};
