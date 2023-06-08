import { Link } from 'atomic-router-react';
import { difficultyModel } from '@/features/difficulty-selection';
import { routes } from '@/shared/routing';
import { Icon } from '@/shared/ui';
import { useToggler } from '@/shared/lib';

export const Header = () => {
  const { open } = useToggler(difficultyModel.toggler);

  return (
    <header className="pt-5 pb-6 px-1 md:px-0 relative flex items-center">
      <Link to={routes.home} className="flex ml-[-4px] items-center text-sm font-semibold text-blue-100">
        <Icon className="w-7 h-7 md:w-5 md:h-5 mr-1" name="common/chevron" />
        <span className="hidden md:block">Назад</span>
      </Link>
      <span className="absolute left-2/4 -translate-x-2/4 text-lg font-bold text-blue-900">Киллер судоку</span>
      <button onClick={open} className="text-blue-100 ml-auto md:hidden font-semibold">
        <Icon className="w-7 h-7 md:w-5 md:h-5" name="common/add" />
      </button>
    </header>
  );
};
