import { Modal } from '@/shared/ui/modal';
import { useToggler } from '@/shared/lib';
import { difficultyModel } from '@/features/difficulty-selection';
import { useUnit } from 'effector-react';
import { difficultyItems } from '@/shared/config';
import { Icon, Title } from '@/shared/ui';

interface DifficultySelectionProps {
  description: string;
  isClosable?: boolean;
  onCancel?: () => void;
  onSelect?: () => void;
  onStartAgain?: () => void;
}

export const DifficultySelection = ({
  description,
  onCancel,
  onStartAgain,
  onSelect,
  isClosable = true,
}: DifficultySelectionProps) => {
  const { isOpen, close } = useToggler(difficultyModel.difficultyToggler);
  const difficultyChosen = useUnit(difficultyModel.difficultyChosen);

  return (
    <Modal isOpen={isOpen} close={isClosable ? close : undefined}>
      <div className="py-[20px] px-5 rounded-md bg-white overflow-hidden max-w-full w-[308px]">
        <Title className="mb-1" size="md">
          Выберите режим игры
        </Title>
        <p className="text-center text-[12px] text-gray-400">{description}</p>
        <ul className="rounded-md overflow-hidden mt-4">
          {difficultyItems.map(({ type, label }) => (
            <li
              key={type}
              onClick={() => {
                onSelect && onSelect();
                difficultyChosen({
                  type,
                });
              }}
              className="flex bg-blue-300 items-center cursor-pointer text-[15px] text-blue-100 not-last:border-b-[1px] not-last:border-b-[#e0e8f7] py-[8px] px-[15px] font-medium hover:bg-[#e4eaf1]">
              <Icon className="w-[18px] h-[18px] mr-[10px]" name="common/sudoku" />
              {label}
            </li>
          ))}
          {onStartAgain && (
            <li
              onClick={onStartAgain}
              className="flex bg-blue-300 items-center cursor-pointer text-[15px] text-blue-100 not-last:border-b-[1px] not-last:border-b-[#e0e8f7] py-[8px] px-[15px] font-medium hover:bg-[#e4eaf1]">
              <Icon className="flex w-[21px] h-[21px] mr-[7px]" name="actions/cancel" />
              Начать заново
            </li>
          )}
        </ul>
      </div>
      {onCancel && (
        <button
          onClick={onCancel}
          className="bg-white mt-[8px] rounded-md max-w-full w-[308px] text-blue-100 font-semibold h-[35px]">
          Отмена
        </button>
      )}
    </Modal>
  );
};
