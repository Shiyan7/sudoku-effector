import { Link } from 'atomic-router-react';
import { routes } from '@/shared/routing';
import { Icon } from '@/shared/ui';

export const Header = () => {
  return (
    <header className="pt-5 pb-6 px-1 md:px-0 relative flex items-center">
      <Link to={routes.home} className="flex ml-[-4px] items-center text-sm font-semibold text-blue-100">
        <Icon className="w-8 h-8 md:w-5 md:h-5 mr-1" name="common/chevron" />
        <span className="hidden md:block">Назад</span>
      </Link>
      <span className="absolute left-2/4 -translate-x-2/4 text-lg font-bold text-blue-900">Киллер судоку</span>
      <button className="text-blue-100 ml-auto font-semibold">
        <Icon className="w-7 h-7 md:w-5 md:h-5" name="common/settings" />
      </button>
    </header>
  );
};
