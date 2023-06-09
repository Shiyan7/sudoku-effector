import { useState, useEffect } from 'react';
import { useUnit } from 'effector-react';
import { timerModel } from '@/features/timer';
import { Icon } from '@/shared/ui';

export const Timer = () => {
  const [time, setTime] = useState<number>(0);
  const { isRunning, toggleTimer } = useUnit({
    isRunning: timerModel.$isRunning,
    toggleTimer: timerModel.toggleTimer,
  });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    return `${padZero(minutes)}:${padZero(seconds)}`;
  };

  const padZero = (value: number) => {
    return value.toLocaleString('en-US', { minimumIntegerDigits: 2 });
  };

  return (
    <div className="flex items-center text-xs font-semibold text-gray-300">
      <span className="block mr-2 min-w-[40px] text-center">{formatTime(time)}</span>
      <button
        className="flex items-center justify-center w-[25px] h-[25px] bg-blue-400 rounded-full"
        onClick={toggleTimer}>
        <Icon
          className="w-[9px] h-[9px] fill-gray-300 stroke-gray-300"
          name={isRunning ? 'common/pause' : 'common/play'}
        />
      </button>
    </div>
  );
};
