import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '../components/Layout';
import { FileUpload } from '../features/upload';
import { FileUploadForMap } from '../features/upload-for-map';
import { lazyImport } from '../utils/lazyImport';

const { Home } = lazyImport(() => import('../features/home'), 'Home');
const { NormalizeLabel } = lazyImport(
  () => import('../features/normalize-label'),
  'NormalizeLabel'
);
const { AutoConvert } = lazyImport(() => import('../features/auto-convert'), 'AutoConvert');
const { DataEditor } = lazyImport(() => import('../features/data-editor'), 'DataEditor');
const { Map } = lazyImport(() => import('../features/map'), 'Map');

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
      { path: '/upload-file-for-map', element: <FileUploadForMap /> },
      { path: '/auto-convert', element: <AutoConvert /> },
      { path: '/:dataset_uid/normalize-label', element: <NormalizeLabel /> },
      { path: '/:dataset_uid/data-editor', element: <DataEditor /> },
      { path: '/:dataset_uid/map', element: <Map /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
