import { useUnit } from 'effector-react';
import { Icon, type IconName } from '@/shared/ui';
import { sudokuModel } from '@/widgets/sudoku';

interface Action {
  label: string;
  handler: () => void;
  iconName: IconName;
}

export const Actions = () => {
  const { backwardClicked } = useUnit({ backwardClicked: sudokuModel.backwardClicked });

  const items: Action[] = [
    { label: 'Отменить', handler: backwardClicked, iconName: 'actions/cancel' },
    { label: 'Очистить', handler: () => console.log('123'), iconName: 'actions/clear' },
    { label: 'Заметки', handler: () => console.log('123'), iconName: 'actions/pen' },
    { label: 'Подсказка', handler: () => console.log('123'), iconName: 'actions/bulb' },
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
