import { Link } from 'atomic-router-react';
import { routes } from '@/shared/routing';
import { difficultyItems } from '@/shared/config';

export const GamePage = () => {
  return (
    <div className="px-5 h-full max-w-lg mx-auto my-0 sm:max-w-screen-md sm:px-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="text-sm font-semibold mr-2 text-[#94a3b7]">Уровень:</span>
          <ul className="p-0 m-0 list-none flex items-center">
            {difficultyItems.map(({ type, label }) => (
              <li className="mr-1 last:mr-0" key={type}>
                <Link
                  className="inline-block text-sm font-semibold p-2 text-[#6e7c8c]"
                  to={routes.game}
                  params={{ type }}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
