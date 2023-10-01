import { useTheme } from 'next-themes';
import { Link } from 'atomic-router-react';
import { routes } from '@/shared/routing';
import { Icon, IconName } from '@/shared/ui';

interface Action {
  handler: () => void;
  iconName: IconName;
}

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const isDarkTheme = theme === 'dark';

  const toggleTheme = () => setTheme(isDarkTheme ? 'light' : 'dark');

  const actions: Action[] = [
    { handler: toggleTheme, iconName: isDarkTheme ? 'common/moon' : 'common/sun' },
    { handler: () => console.log('settings'), iconName: 'common/settings' },
  ];

  return (
    <header className="pt-5 pb-6 px-1 md:px-0 relative flex items-center">
      <Link
        to={routes.home}
        className="flex ml-[-4px] items-center text-sm font-semibold text-blue-100 dark:text-blue-100-dark"
      >
        <Icon className="w-8 h-8 md:w-5 md:h-5 mr-1" name="common/chevron" />
        <span className="hidden md:block">Назад</span>
      </Link>
      <span className="absolute left-2/4 -translate-x-2/4 text-lg font-bold text-blue-900 dark:text-[#B8C0CB]">
        Киллер судоку
      </span>
      <div className="ml-auto flex items-center gap-4">
        {actions.map(({ handler, iconName }) => (
          <button className="text-blue-100 dark:text-blue-100-dark font-semibold" onClick={handler}>
            <Icon className="w-6 h-6" name={iconName} />
          </button>
        ))}
      </div>
    </header>
  );
};
