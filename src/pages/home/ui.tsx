import { DifficultySelection, difficultyModel } from '@/features/difficulty-selection';
import { useToggler } from '@/shared/lib';
import { Button, Title } from '@/shared/ui';

export const HomePage = () => {
  const { open } = useToggler(difficultyModel.difficultyToggler);

  return (
    <div className="px-6 min-h-[350px] h-screen flex items-center justify-center max-w-lg mx-auto my-0 sm:max-w-xs sm:px-0">
      <div className="flex flex-col h-full justify-center w-full items-center">
        <Title className="text-center pb-[4px] sm:pb-[10px]">Киллер судоку</Title>
        <Title size="sm" className="text-center pb-36">
          Кроссворд из цифр
        </Title>
        <Button onClick={open} className="w-full max-w-[95%] sm:max-w-full">
          Новая игра
        </Button>
      </div>
      <DifficultySelection description="Пазлы для всех уровней мастерства" />
    </div>
  );
};
