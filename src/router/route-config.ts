import { IRouteConfigs } from '@src/types/system';

const constantsRoutes: IRouteConfigs[] = [
  {
    path: ['/', '/demo'],
    component: 'demo',
    exact: true,
    auth: false,
  },
  {
    path: '/page1',
    component: 'page1',
    exact: true,
    auth: false,
  },
  // {
  //   path: '/404',
  //   component: 'system/not-found/index.tsx',
  //   exact: true,
  //   auth: false,
  // },
];
export default constantsRoutes;