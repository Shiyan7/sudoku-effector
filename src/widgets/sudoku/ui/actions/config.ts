import type { IconName } from '@/shared/ui/icon';

interface Action {
  label: string;
  iconName: IconName;
}

export const items: Action[] = [
  { label: 'Отменить', iconName: 'actions/cancel' },
  { label: 'Очистить', iconName: 'actions/clear' },
  { label: 'Заметки', iconName: 'actions/pen' },
  { label: 'Подсказка', iconName: 'actions/bulb' },
];
