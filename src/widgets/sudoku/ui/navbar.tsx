import { Link } from 'atomic-router-react';
import { useUnit } from 'effector-react';
import { routes } from '@/shared/routing';
import { difficultyItems } from '@/shared/config';

export const Navbar = () => {
  const params = useUnit(routes.game.$params);

  return (
    <div className="flex flex-wrap items-center">
      <span className="text-xs font-semibold mr-2 text-gray-300">Уровень:</span>
      <ul className="flex flex-wrap items-center">
        {difficultyItems.map(({ type, label }) => {
          const isActive = type === params.type;

          return (
            <li className="not-last:mr-1" key={type}>
              <Link
                className={`inline-block rounded transition duration-200 hover:bg-[#f1f4f8] text-xs font-semibold p-2 ${
                  isActive ? 'text-blue-100' : 'text-gray-400'
                }`}
                to={routes.game}
                params={{ type }}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
