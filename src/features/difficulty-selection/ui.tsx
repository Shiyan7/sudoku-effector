import { useUnit } from 'effector-react';
import { Modal } from '@/shared/ui/modal';
import { useToggler } from '@/shared/lib';
import { difficultyModel } from '@/features/difficulty-selection';
import { difficultyItems } from '@/shared/config';
import { Icon, Title } from '@/shared/ui';

interface DifficultySelectionProps {
  description: string;
  isClosable?: boolean;
  onCancel?: () => void;
  onStartAgain?: () => void;
}

export const DifficultySelection = ({
  description,
  onCancel,
  onStartAgain,
  isClosable = true,
}: DifficultySelectionProps) => {
  const { isOpen, close } = useToggler(difficultyModel.difficultyToggler);
  const difficultyChosen = useUnit(difficultyModel.difficultyChosen);

  return (
    <Modal isOpen={isOpen} close={isClosable ? close : undefined}>
      <div className="py-[23px] px-5 rounded-md bg-white overflow-hidden max-w-full w-[340px]">
        <Title className="mb-1" size="md">
          Выберите режим игры
        </Title>
        <p className="text-center text-xs text-gray-400">{description}</p>
        <ul className="rounded-md overflow-hidden mt-5">
          {difficultyItems.map(({ type, label }) => (
            <li
              key={type}
              onClick={() =>
                difficultyChosen({
                  type,
                })
              }
              className="flex bg-blue-300 items-center cursor-pointer text-blue-100 not-last:border-b-[1px] not-last:border-b-[#e0e8f7] py-[10px] px-[15px] font-medium hover:bg-[#e4eaf1]">
              <Icon className="w-[21px] h-[21px] mr-[10px]" name="common/sudoku" />
              {label}
            </li>
          ))}
          {onStartAgain && (
            <li
              onClick={onStartAgain}
              className="flex bg-blue-300 items-center cursor-pointer text-[15px] text-blue-100 not-last:border-b-[1px] not-last:border-b-[#e0e8f7] py-[10px] px-[15px] font-medium hover:bg-[#e4eaf1]">
              <Icon className="flex w-[24px] h-[24px] mr-[7px]" name="actions/cancel" />
              Начать заново
            </li>
          )}
        </ul>
      </div>
      {onCancel && (
        <button
          onClick={onCancel}
          className="bg-white mt-[8px] rounded-md max-w-full w-[340px] text-blue-100 font-semibold h-[40px]">
          Отмена
        </button>
      )}
    </Modal>
  );
};
