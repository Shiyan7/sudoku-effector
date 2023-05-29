import { useEvent, useStore, useUnit } from 'effector-react';
import type { TogglerInstance } from './types';

export function useToggler(togglerInstance: TogglerInstance) {
  const { $isOpen, open, close, toggle } = togglerInstance;

  return useUnit({ isOpen: $isOpen, open, close, toggle });
}
