import { Routes, Route } from 'react-router-dom';
import { lazy, ReactNode, Suspense } from 'react';
import ProtectedRoute from '@/features/auth/ProtectedRoute';
import Spinner from '@/components/common/Spinner';

const MainPage = lazy(() => import('@/features/home/HomePage'));
const AddMealPage = lazy(() => import('@/features/meal/add/AddMealPage'));
const IngredientsPage = lazy(() => import('@/features/ingredients/IngredientsPage'));
const FridgePage = lazy(() => import('@/features/meal/get/FridgePage'));

interface RouteRule {
  path: string;
  element: ReactNode;
  isPublic?: boolean;
}

const routes: RouteRule[] = [
  {
    path: '/',
    element: <MainPage />,
    isPublic: false,
  },
  {
    path: '/ingredients',
    element: <IngredientsPage />,
  },
  {
    path: '/meals/add',
    element: <AddMealPage />,
  },
  {
    path: '/fridge/',
    element: <FridgePage />
  }
];

const AppRoutes = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {routes.map(({ path, element, isPublic }: RouteRule) => {
          if (!isPublic) element = <ProtectedRoute>{element}</ProtectedRoute>;
          return <Route path={path} element={element} />;
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
