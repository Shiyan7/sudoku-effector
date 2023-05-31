import clsx from 'clsx';
import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { routes } from '@/shared/routing';
import { difficultyItems } from '@/shared/config';
import { Timer } from '@/features/timer';
import { Icon } from '@/shared/ui';

export const Navbar = () => {
  const params = useUnit(routes.game.$params);
  const currentDifficulty = difficultyItems.find(({ type }) => type === params?.type);

  return (
    <div className="flex px-2 sm:px-0 items-center justify-between mb-3">
      <div className="flex flex-col sm:flex-row items-center">
        <span className="text-xs hidden sm:block font-medium mr-2 text-gray-300">Уровень:</span>
        <ul className="hidden sm:flex items-center">
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
        <button className="flex sm:hidden items-center text-xs font-semibold text-gray-300">
          {currentDifficulty?.label}
          <Icon className="w-5 h-5 ml-1 rotate-[-90deg]" type="common" name="chevron" />
        </button>
      </div>
      <div className="text-blue-900 text-xs font-semibold">Ошибки: 0/3</div>
      <Timer />
    </div>
  );
};
