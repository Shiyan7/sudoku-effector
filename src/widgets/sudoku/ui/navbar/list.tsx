import { difficultyItems } from '@/shared/config';
import { routes } from '@/shared/routing';
import { Link } from 'atomic-router-react';
import clsx from 'clsx';
import { useUnit } from 'effector-react';

interface NavbarListProps {
  isOpen: boolean;
  close: () => void;
}

export const NavbarList = ({ isOpen, close }: NavbarListProps) => {
  const { params } = useUnit({
    params: routes.game.$params,
  });

  return (
    <>
      <div
        className={clsx(
          'absolute top-7 z-[1001] left-3 transition-transform origin-top-left',
          isOpen ? 'scale-100' : 'scale-0'
        )}
      >
        <ul className="flex flex-col bg-white dark:bg-[#25242C] rounded-md drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)]">
          {difficultyItems.map(({ type, label }) => {
            const isActive = type === params.type;

            return (
              <li
                className="not-last:border-b-[1px] not-last:border-b-[#e0e8f7] dark:not-last:border-b-[#3C394B]"
                key={type}
              >
                <Link
                  className={clsx(
                    'inline-block rounded-md transition duration-200 text-xs font-semibold py-3 px-[18px] w-full',
                    isActive ? 'text-blue-100 dark:text-blue-100-dark' : 'text-gray-400 dark:text-gray-100'
                  )}
                  onClick={close}
                  to={routes.game}
                  params={{ type }}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div
        onClick={close}
        className={clsx(
          'fixed top-0 left-0 bg-black/50 w-full h-full z-[1000] transition-all',
          isOpen ? 'opacity-1 visible' : 'opacity-0 invisible'
        )}
      />
    </>
  );
};
