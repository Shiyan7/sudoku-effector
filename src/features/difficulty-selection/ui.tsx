import { useUnit } from 'effector-react';
import { Modal } from '@/shared/ui/modal';
import { useToggler } from '@/shared/lib';
import { difficultyModel } from '@/features/difficulty-selection';
import { difficultyItems } from '@/shared/config';
import { Title } from '@/shared/ui';

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
  const { difficultyChosen } = useUnit({ difficultyChosen: difficultyModel.difficultyChosen });

  return (
    <Modal isOpen={isOpen} close={isClosable ? close : undefined}>
      <div className="py-[23px] px-5 rounded-md bg-white dark:bg-dark-100 overflow-hidden max-w-full w-[340px]">
        <Title className="mb-1" size="md">
          Выберите режим игры
        </Title>
        <p className="text-center text-xs text-gray-400">{description}</p>
        <ul className="overflow-hidden mt-5">
          {difficultyItems.map(({ type, label }) => (
            <li
              key={type}
              onClick={() =>
                difficultyChosen({
                  type,
                })
              }
              className="flex mb-1.5 bg-blue-300 rounded-md dark:bg-[#31333D] dark:hover:bg-[#3F4353] items-center justify-center cursor-pointer text-blue-100 py-[10px] px-[15px] font-medium hover:bg-[#e4eaf1] transition-colors"
            >
              {label}
            </li>
          ))}
        </ul>
        {onStartAgain && (
          <button
            onClick={onStartAgain}
            className="rounded-md w-full flex justify-center bg-blue-300 dark:bg-[#31333D] dark:hover:bg-[#3F4353] items-center cursor-pointer text-blue-100 not-last:border-b-[1px] not-last:border-b-[#e0e8f7] py-[10px] px-[15px] font-medium hover:bg-[#e4eaf1] transition-colors"
          >
            Начать заново
          </button>
        )}
      </div>
      {onCancel && (
        <button
          onClick={onCancel}
          className="bg-white dark:bg-dark-100 mt-[8px] rounded-md max-w-full w-[340px] text-blue-100 font-semibold h-[40px]"
        >
          Отмена
        </button>
      )}
    </Modal>
  );
};
