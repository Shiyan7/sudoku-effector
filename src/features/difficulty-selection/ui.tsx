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
      <ul className="list-none p-0 m-0 py-[5px] min-w-full rounded-[25px] bg-white overflow-hidden sm:min-w-[300px]">
        {difficultyItems.map(({ type, label }) => (
          <li
            key={type}
            onClick={() => difficultyChosen({ type })}
            className="cursor-pointer text-xl text-blue-100 border-b-[1px] border-[#f4f4f4] last:border-none font-medium py-[11px] hover:bg-[#f4f4f4]">
            {label}
          </li>
        ))}
      </ul>
    </Modal>
  );
};
