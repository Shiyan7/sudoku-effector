import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { useToggler } from '@/shared/lib';
import { Button, Modal, Title } from '@/shared/ui';

export const GameOver = () => {
  const { isOpen } = useToggler(sudokuModel.gameOverToggler);
  const { secondChanceClicked, newGameClicked } = useUnit({
    secondChanceClicked: sudokuModel.secondChanceClicked,
    newGameClicked: sudokuModel.newGameClicked,
  });

  return (
    <Modal isOpen={isOpen}>
      <div className="py-6 px-7 pb-[32px] max-w-full w-[340px] rounded-md bg-white overflow-hidden">
        <Title className="mb-2" size="md">
          Игра окончена
        </Title>
        <p className="text-gray-300 text-[15px] font-semibold mb-5">Вы сделали 3 ошибки и проиграли в этой игре</p>
        <Button className="text-[14px] mb-4 w-full h-[50px]" variant="square" onClick={secondChanceClicked}>
          Второй шанс
        </Button>
        <button className="text-blue-100 font-semibold text-[14px]" onClick={newGameClicked}>
          Новая игра
        </button>
      </div>
    </Modal>
  );
};
