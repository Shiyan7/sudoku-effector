import clsx from 'clsx';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { sudokuModel } from '@/widgets/sudoku';
import { Timer } from '@/features/timer';
import { routes } from '@/shared/routing';
import { difficultyItems } from '@/shared/config';
import { Icon } from '@/shared/ui';

export const Navbar = () => {
  const { params, mistakes } = useUnit({
    params: routes.game.$params,
    mistakes: sudokuModel.$mistakes,
  });
  const currentDifficulty = difficultyItems.find(({ type }) => type === params?.type);

  return (
    <div className="flex px-2 md:px-0 items-center justify-between mb-3">
      <div className="flex flex-col md:flex-row items-center">
        <span className="text-xs hidden md:block font-semibold mr-2 text-gray-300">Уровень:</span>
        <ul className="hidden md:flex items-center">
          {difficultyItems.map(({ type, label }) => {
            const isActive = type === params.type;

            return (
              <li className="not-last:mr-1" key={type}>
                <Link
                  className={clsx(
                    'inline-block rounded transition duration-200 hover:bg-[#f1f4f8] text-xs font-semibold p-2',
                    isActive ? 'text-blue-100' : 'text-gray-400'
                  )}
                  to={routes.game}
                  params={{ type }}>
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
        <button className="flex md:hidden items-center text-xs font-semibold text-gray-300">
          {currentDifficulty?.label}
          <Icon className="w-5 h-5 ml-1 rotate-[-90deg]" name="common/chevron" />
        </button>
      </div>
      <div className="text-blue-900 text-xs font-semibold">Ошибки: {mistakes}/3</div>
      <Timer />
    </div>
  );
};
