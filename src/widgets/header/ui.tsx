import { routes } from '@/shared/routing';
import { Icon } from '@/shared/ui';
import { Link } from 'atomic-router-react';

export const Header = () => {
  return (
    <div className="relative flex items-center mb-4">
      <Link to={routes.home} className="flex sm:ml-[-4px] items-center text-sm font-semibold text-blue-100">
        <Icon className="flex w-7 h-7 sm:w-5 sm:h-5 mr-1" type="common" name="chevron" />
        <span className="hidden sm:block">Назад</span>
      </Link>
      <div className="absolute left-2/4 -translate-x-2/4">
        <span className="text-md font-semibold text-blue-900">Киллер судоку</span>
      </div>
    </div>
  );
};
