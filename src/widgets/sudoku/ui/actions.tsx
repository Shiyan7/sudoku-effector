import { Icon } from '@/shared/ui';
import type { IconName } from '@/shared/ui/icon';
import { useUnit } from 'effector-react';
import { sudokuModel } from '..';

interface Action {
  label: string;
  iconName: IconName;
  handler: () => void;
}

export const Actions = () => {
  const { clearClicked } = useUnit({ clearClicked: sudokuModel.clearClicked });

  const items: Action[] = [
    { label: 'Отменить', handler: () => console.log('cancel'), iconName: 'actions/cancel' },
    { label: 'Очистить', handler: clearClicked, iconName: 'actions/clear' },
    { label: 'Заметки', handler: () => console.log('Заметки'), iconName: 'actions/pen' },
    { label: 'Подсказка', handler: () => console.log('Подсказка'), iconName: 'actions/bulb' },
  ];

  return (
    <div className="flex items-center justify-center md:justify-between w-full mb-12 md:mb-3">
      {items.map(({ label, handler, iconName }) => (
        <button onClick={handler} key={label} className="not-last:mr-9 md:not-last:mr-0 text-gray-400 md:text-blue-100">
          <div className="flex items-center justify-center md:w-14 md:h-14 rounded-full md:bg-blue-400">
            <Icon className="flex w-8 h-8" name={iconName} />
          </div>
          <span className="text-[12px] leading-[12px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};
