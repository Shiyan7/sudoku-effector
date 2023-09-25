import { Icon } from '@/shared/ui';
import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';

interface ActionsProps {
  disabled: boolean;
}

export const Actions = ({ disabled }: ActionsProps) => {
  const { clearClicked, hintClicked } = useUnit({
    clearClicked: sudokuModel.clearClicked,
    hintClicked: sudokuModel.hintClicked,
  });

  const items = [
    {
      hotkey: 'Ctrl+Z',
      label: 'Отменить',
      handler: () => console.log('Отменить'),
      icon: <Icon className="flex w-8 h-8" name="actions/cancel" />,
    },
    {
      hotkey: 'Ctrl+X',
      label: 'Очистить',
      handler: clearClicked,
      icon: <Icon className="flex w-8 h-8" name="actions/clear" />,
    },
    {
      hotkey: 'Ctrl+N',
      label: 'Заметки',
      handler: () => console.log('Заметки'),
      icon: <Icon className="flex w-8 h-8" name="actions/pen" />,
    },
    {
      hotkey: 'Ctrl+V',
      label: 'Подсказка',
      handler: hintClicked,
      icon: <Icon className="flex w-8 h-8" name="actions/bulb" />,
    },
  ];

  return (
    <div className="flex items-center justify-center md:justify-between w-full mb-12 md:mb-3">
      {items.map(({ hotkey, label, handler, icon }) => (
        <button
          disabled={disabled}
          title={hotkey}
          onClick={handler}
          key={label}
          className="group relative not-last:mr-9 md:not-last:mr-0 text-gray-400 md:text-blue-100 disabled:pointer-events-none disabled:text-gray-300">
          <div className="flex items-center justify-center md:w-14 md:h-14 rounded-full md:bg-blue-400 md:group-hover:bg-blue-500 transition-colors">
            {icon}
          </div>
          <span className="text-[12px] leading-[12px] font-semibold">{label}</span>
        </button>
      ))}
    </div>
  );
};
