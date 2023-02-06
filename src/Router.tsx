import { lazy } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';

import NotFoundPage from './pages/404/404';
import BycicleHome from './pages/BycicleHome';

import Layout from './components/Layout/Layout';
import LazySuspense from './components/Molecules/LazySuspense/LazySuspense';
const BycicleForm = lazy(() => import('./pages/BycicleForm'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <BycicleHome />,
      },
      {
        path: '/bycicle-form/:id',
        element: (
          <LazySuspense>
            <BycicleForm />
          </LazySuspense>
        ),
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
];

const Router = () => {
  return useRoutes(routes);
};

export default Router;
