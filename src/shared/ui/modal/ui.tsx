import { PropsWithChildren } from 'react';
import { tw } from 'typewind';
import { useEscape, useLockedBody } from './lib';
import { Portal } from '../portal';

interface ModalProps extends PropsWithChildren {
  isOpen: boolean;
  close: () => void;
}

export const Modal = ({ children, isOpen, close }: ModalProps) => {
  useLockedBody(isOpen);

  useEscape(close);

  return (
    <Portal rootId="#modal">
      {isOpen && (
        <div
          className={tw.fixed.inset_x_0.inset_y_0.overflow_x_hidden.overflow_y_auto.text_center.z_1000
            .before(tw.content_['_↗'].inline_block.align_bottom.h_full.sm(tw.align_middle))
            .after(tw.content_['_↗'].block.fixed.inset_x_0.inset_y_0.cursor_pointer.bg_black$['70'])}
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className={tw.relative.z_10.mx_auto.inline_flex.items_center.flex_col.align_middle.my_14.w_['85%'].sm(
              tw.w_auto
            )}
          >
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};
