import { Tabs, TabsList, TabsTrigger } from '@monorepo-starter/ui/components/tabs';
import { cn } from '@monorepo-starter/ui/lib/utils';
import { Outlet, useLocation, useNavigate } from 'react-router';

function RootLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const classNames = {
    wrapper: cn(`relative mx-auto w-full`),
    listWrapper: cn(`bg-muted w-full border-b px-6`),
    list: cn(``),
    trigger: cn(``),
    content: cn(``),
  };

  return (
    <div className={classNames.wrapper}>
      <Tabs defaultValue={location.pathname}>
        <div className={classNames.listWrapper}>
          <TabsList className={classNames.list}>
            <TabsTrigger value="/" onClick={() => navigate('/')} className={classNames.trigger}>
              Home
            </TabsTrigger>
            <TabsTrigger value="/about" onClick={() => navigate('/about')} className={classNames.trigger}>
              About
            </TabsTrigger>
            <TabsTrigger value="/concerts" onClick={() => navigate('/concerts')} className={classNames.trigger}>
              Concerts
            </TabsTrigger>
          </TabsList>
        </div>
        <Outlet />
      </Tabs>
    </div>
  );
}

export default RootLayout;
