import { Modal } from "@/shared/ui";
import { difficultyModel } from "@/features/difficulty-selection";
import { useToggler } from "@/shared/lib";

export const DifficultySelection = () => {
  const { isOpen, close } = useToggler(difficultyModel.toggler);

  return (
    <Modal isOpen={isOpen} close={close}>
      DifficultySelection
    </Modal>
  );
};
