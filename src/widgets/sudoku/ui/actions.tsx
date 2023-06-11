import { Icon } from '@/shared/ui';
import type { IconName } from '@/shared/ui/icon';
import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';

interface Action {
  hotkey: string;
  label: string;
  iconName: IconName;
  handler: () => void;
}

export const Actions = () => {
  const { clearClicked, hintClicked } = useUnit({
    clearClicked: sudokuModel.clearClicked,
    hintClicked: sudokuModel.hintClicked,
  });

  const items: Action[] = [
    { hotkey: 'Ctrl+Z', label: 'Отменить', handler: () => console.log('Отменить'), iconName: 'actions/cancel' },
    { hotkey: 'Ctrl+X', label: 'Очистить', handler: clearClicked, iconName: 'actions/clear' },
    { hotkey: 'Ctrl+N', label: 'Заметки', handler: () => console.log('Заметки'), iconName: 'actions/pen' },
    { hotkey: 'Ctrl+V', label: 'Подсказка', handler: hintClicked, iconName: 'actions/bulb' },
  ];

  return (
    <div className="flex items-center justify-center md:justify-between w-full mb-12 md:mb-3">
      {items.map(({ hotkey, label, handler, iconName }) => (
        <button
          title={hotkey}
          onClick={handler}
          key={label}
          className="relative not-last:mr-9 md:not-last:mr-0 text-gray-400 md:text-blue-100">
          <div className="flex items-center justify-center md:w-14 md:h-14 rounded-full md:bg-blue-400">
            <Icon className="flex w-8 h-8" name={iconName} />
          </div>
          <span className="text-[12px] leading-[12px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};
