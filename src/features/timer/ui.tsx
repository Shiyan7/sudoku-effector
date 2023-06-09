import { useUnit } from 'effector-react';
import { timerModel } from '@/features/timer';
import { Icon } from '@/shared/ui/icon';

export const Timer = () => {
  const { isRunning, startTimer, stopTimer, time } = useUnit({
    isRunning: timerModel.isRunning,
    startTimer: timerModel.startTimer,
    stopTimer: timerModel.stopTimer,
    time: timerModel.$formattedTime,
  });

  return (
    <div className="flex items-center text-xs font-semibold text-gray-300">
      <span className="block mr-2 min-w-[40px] text-center">{time}</span>
      <button
        className="flex items-center justify-center w-[25px] h-[25px] bg-blue-400 rounded-full"
        onClick={isRunning ? stopTimer : startTimer}>
        <Icon
          className="w-[9px] h-[9px] fill-gray-300 stroke-gray-300"
          name={isRunning ? 'common/pause' : 'common/play'}
        />
      </button>
    </div>
  );
};
