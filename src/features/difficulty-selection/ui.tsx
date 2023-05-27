import { Modal } from '@/shared/ui/modal';
import { useToggler } from '@/shared/lib';
import { difficultyModel } from '@/features/difficulty-selection';
import { useUnit } from 'effector-react';
import { tw } from 'typewind';
import { items } from './config';

export const DifficultySelection = () => {
  const { isOpen, close } = useToggler(difficultyModel.toggler);
  const difficultyChosen = useUnit(difficultyModel.difficultyChosen);

  return (
    <Modal isOpen={isOpen} close={close}>
      <ul
        className={tw.list_none.p_0.m_0.py_['5px'].min_w_full.rounded_['25px'].bg_white.overflow_hidden.sm(
          tw.min_w_['300px']
        )}>
        {items.map(({ type, text }) => (
          <li
            key={type}
            onClick={() => difficultyChosen({ type })}
            className={tw.cursor_pointer.text_xl.text_blue_100.border_b_['1px'].border_['#f4f4f4']
              .last(tw.border_none)
              .font_medium.py_['11px'].hover(tw.bg_['#f4f4f4'])}>
            {text}
          </li>
        ))}
      </ul>
    </Modal>
  );
};
