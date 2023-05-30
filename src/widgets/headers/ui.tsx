import { routes } from '@/shared/routing';
import { Icon } from '@/shared/ui';
import { Link } from 'atomic-router-react';

export const Header = () => {
  return (
    <div className="flex items-center mb-4">
      <Link to={routes.home} className="flex ml-[-4px] items-center text-sm font-semibold text-blue-100">
        <Icon className="flex w-5 h-5 mr-1" type="common" name="chevron" />
        Назад
      </Link>
      <div className=""></div>
    </div>
  );
};
