import { PropsWithChildren } from 'react';
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
          className="fixed inset-x-0 inset-y-0 overflow-x-hidden overflow-y-auto text-center z-1000 before:content-[''] before:inline-block before:align-bottom before:h-full before:sm:align-middle after:content-[''] after:block after:fixed after:inset-x-0 after:inset-y-0 after:cursor-pointer after:bg-black/70"
          onClick={close}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative z-10 mx-auto inline-flex items-center flex-col align-middle my-14 w-[85%] sm:w-auto"
          >
            {children}
          </div>
        </div>
      )}
    </Portal>
  );
};
