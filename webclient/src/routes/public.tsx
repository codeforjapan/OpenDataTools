import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '../components/Layout';
import { lazyImport } from '../utils/lazyImport';

const { Home } = lazyImport(() => import('../features/home'), 'Home');
const { FileUpload } = lazyImport(() => import('../features/upload'), 'FileUpload');
const { NormalizeLabel } = lazyImport(
  () => import('../features/normalize-label'),
  'NormalizeLabel'
);
const { AutoConvert } = lazyImport(() => import('../features/auto-convert'), 'AutoConvert');
const { DataEditor } = lazyImport(() => import('../features/data-editor'), 'DataEditor');
const { Map } = lazyImport(() => import('../features/map'), 'Map');
const { DataManagertest } = lazyImport(
  () => import('../features/datamanagertest'),
  'DataManagertest'
);
const { Test } = lazyImport(() => import('../features/test'), 'Test');

const App = () => {
  return (
    <MainLayout>
      <Suspense>
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const publicRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/upload-file', element: <FileUpload /> },
      { path: '/normalize-label', element: <NormalizeLabel /> },
      { path: '/auto-convert', element: <AutoConvert /> },
      { path: '/data-editor', element: <DataEditor /> },
      { path: '/map', element: <Map /> },
      { path: '/datamanagertest', element: <DataManagertest /> },
      { path: '/test', element: <Test /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
