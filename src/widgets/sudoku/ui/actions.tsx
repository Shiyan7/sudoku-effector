import { Icon } from '@/shared/ui';
import type { IconName } from '@/shared/ui/icon';
import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface Action {
  label: string;
  chip?: ReactNode;
  iconName: IconName;
  handler: () => void;
}

interface ActionsProps {
  disabled: boolean;
}

export const Actions = ({ disabled }: ActionsProps) => {
  const { backwardClicked, isNotesEnabled, toggleNotesClicked, clearClicked, hintClicked } = useUnit({
    backwardClicked: sudokuModel.backwardClicked,
    isNotesEnabled: sudokuModel.$isNotesEnabled,
    toggleNotesClicked: sudokuModel.toggleNotesClicked,
    clearClicked: sudokuModel.clearClicked,
    hintClicked: sudokuModel.hintClicked,
  });

  const NotesStatus = (
    <span
      className={clsx(
        'absolute -top-2.5 -right-3 border-white border-2 flex items-center justify-center rounded-full w-10 h-7 uppercase text-xs leading-none tracking-wider text-white font-bold transition-colors',
        isNotesEnabled ? 'bg-blue-100 ' : 'bg-[#adb6c2]'
      )}
    >
      {isNotesEnabled ? 'On' : 'Off'}
    </span>
  );

  const items: Action[] = [
    { label: 'Отменить', handler: backwardClicked, iconName: 'actions/cancel' },
    { label: 'Очистить', handler: clearClicked, iconName: 'actions/clear' },
    { label: 'Заметки', handler: toggleNotesClicked, iconName: 'actions/pen', chip: NotesStatus },
    { label: 'Подсказка', handler: hintClicked, iconName: 'actions/bulb' },
  ];

  return (
    <div className="flex items-center justify-center md:justify-between w-full mb-12 md:mb-3">
      {items.map(({ chip, label, handler, iconName }) => (
        <button
          disabled={disabled}
          onClick={handler}
          key={label}
          className="group cursor-default lg:cursor-pointer relative not-last:mr-9 md:not-last:mr-0 text-gray-400 md:text-blue-100 disabled:pointer-events-none disabled:text-gray-300"
        >
          {chip}
          <div className="flex items-center justify-center md:w-14 md:h-14 rounded-full md:bg-blue-400 md:group-hover:bg-blue-500 transition-colors">
            <Icon className="flex w-8 h-8 fill-current" name={iconName} />
          </div>
          <span className="text-[12px] leading-[12px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};
