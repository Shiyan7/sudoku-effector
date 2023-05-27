import { DifficultySelection, difficultyModel } from '@/features/difficulty-selection';
import { tw } from 'typewind';
import { useToggler } from '@/shared/lib';
import { Button, Title } from '@/shared/ui';

export const HomePage = () => {
  const { open } = useToggler(difficultyModel.toggler);

  return (
    <div className={tw.flex.flex_col.h_full.justify_center.items_center}>
      <Title className={tw.text_center.pb_['4px'].sm(tw.pb_['10px'])}>Киллер судоку</Title>
      <Title size="sm" className={tw.text_center.pb_36}>
        Кроссворд из цифр
      </Title>
      <Button onClick={open} className={tw.w_full.max_w_['95%'].sm(tw.max_w_full)}>
        Новая игра
      </Button>
      <DifficultySelection />
    </div>
  );
};
