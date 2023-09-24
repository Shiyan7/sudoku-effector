import { useUnit } from 'effector-react';
import { Icon } from '@/shared/ui/icon';
import { timerModel } from './model';

interface TimerProps {
  disabled?: boolean;
}

export const Timer = ({ disabled }: TimerProps) => {
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
        disabled={disabled}
        className="flex items-center justify-center w-[25px] h-[25px] bg-blue-400 disabled:pointer-events-none hover:bg-blue-500 transition-colors rounded-full"
        onClick={isRunning ? stopTimer : startTimer}>
        <Icon
          className="w-[9px] h-[9px] fill-gray-300 stroke-gray-300"
          name={isRunning ? 'common/pause' : 'common/play'}
        />
      </button>
    </div>
  );
};
