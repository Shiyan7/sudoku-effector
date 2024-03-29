import { useUnit } from 'effector-react';
import { timerModel } from '@/features/timer';
import { difficultyItems } from '@/shared/config';
import { routes } from '@/shared/routing';
import { Icon, IconName } from '@/shared/ui/icon';

interface StatsItem {
  label: string;
  icon: IconName;
  value: string | number | undefined;
}

export const Stats = () => {
  const { params, formattedTime } = useUnit({
    params: routes.game.$params,
    formattedTime: timerModel.$formattedTime,
  });

  const currentDifficulty = difficultyItems.find(({ type }) => type === params?.type);

  const stats: StatsItem[] = [
    { label: 'Уровень', icon: 'common/stats', value: currentDifficulty?.label },
    { label: 'Время', icon: 'common/time', value: formattedTime },
  ];

  return (
    <>
      {stats.map(({ label, icon, value }) => (
        <div
          className="flex w-60 items-center h-12 text-white not-last:border-b-[1px] not-last:border-b-border-color"
          key={label}
        >
          <Icon className="w-7 h-7 mr-3 fill-current" name={icon} />
          <div className="flex items-center justify-between w-full">
            <span className="text-sm">{label}</span>
            <span className="text-sm font-medium">{value}</span>
          </div>
        </div>
      ))}
    </>
  );
};
