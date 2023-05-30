import { Modal } from '@/shared/ui/modal';
import { useToggler } from '@/shared/lib';
import { difficultyModel } from '@/features/difficulty-selection';
import { useUnit } from 'effector-react';
import { difficultyItems } from '@/shared/config';

export const DifficultySelection = () => {
  const { isOpen, close } = useToggler(difficultyModel.toggler);
  const difficultyChosen = useUnit(difficultyModel.difficultyChosen);

  return (
    <Modal isOpen={isOpen} close={close}>
      <ul className="py-[5px] min-w-full rounded-[25px] bg-white overflow-hidden sm:min-w-[300px]">
        {difficultyItems.map(({ type, label }) => (
          <li
            key={type}
            onClick={() =>
              difficultyChosen({
                type,
              })
            }
            className="cursor-pointer text-xl text-blue-100 not-last:border-b-[1px] not-last:border-[#f4f4f4] py-[11px] hover:bg-[#f4f4f4]">
            {label}
          </li>
        ))}
      </ul>
    </Modal>
  );
};
