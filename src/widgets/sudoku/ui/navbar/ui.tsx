import clsx from 'clsx';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { Timer } from '@/features/timer';
import { routes } from '@/shared/routing';
import { difficultyItems } from '@/shared/config';
import { Icon } from '@/shared/ui';
import { NavbarList } from './list';
import { useState } from 'react';

export const Navbar = () => {
  const [isListOpen, setIsListOpen] = useState<boolean>(false);

  const { params, countMistakes, isWin } = useUnit({
    params: routes.game.$params,
    countMistakes: sudokuModel.$countMistakes,
    isWin: sudokuModel.$isWin,
  });

  const currentDifficulty = difficultyItems.find(({ type }) => type === params?.type);

  return (
    <div className="relative flex px-2 md:px-0 items-center justify-between mb-4">
      <div className="flex flex-col md:flex-row items-center">
        <span className="text-xs hidden md:block font-semibold mr-2 text-gray-300">Уровень:</span>
        <ul className="hidden md:flex items-center">
          {difficultyItems.map(({ type, label }) => {
            const isActive = type === params.type;

            return (
              <li className="not-last:mr-1" key={type}>
                <Link
                  className={clsx(
                    'inline-block rounded transition duration-200 hover:bg-[#f1f4f8] hover:text-[#5D6773] dark:hover:bg-dark-100 dark:hover:text-blue-200 text-xs font-semibold p-2',
                    isActive ? '!text-blue-100 dark:!text-blue-100-dark' : 'text-gray-400'
                  )}
                  to={routes.game}
                  params={{ type }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button
          onClick={() => setIsListOpen(true)}
          className="flex md:hidden items-center text-xs font-semibold text-gray-300 dark:text-gray-100"
        >
          {currentDifficulty?.label}
          <Icon
            className={clsx('w-5 h-5 ml-1 transition-transform duration-300', isListOpen ? 'rotate-90' : '-rotate-90')}
            name="common/chevron"
          />
        </button>
      </div>
      <div className="text-blue-900 dark:text-gray-100 text-xs font-semibold">Ошибки: {countMistakes}/3</div>
      <Timer disabled={isWin} />
      <NavbarList isOpen={isListOpen} close={() => setIsListOpen(false)} />
    </div>
  );
};
