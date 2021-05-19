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
  {
    path: '/purchase-list',
    component: 'purchase/list-page',
    exact: true,
    auth: false,
  },
  {
    path: '/purchase-details',
    component: 'purchase/details-page',
    exact: true,
    auth: false,
  },
  {
    path: '/goods-list',
    component: 'purchase/goods-list',
    exact: true,
    auth: false,
  },
  {
    path: '/collection-assistant',
    component: 'checkstand/collection-assistant',
    exact: true,
    auth: false,
  },
  {
    path: '/collection-records',
    component: 'checkstand/collection-records',
    exact: true,
    auth: false,
  },
  {
    path: '/collection-details',
    component: 'checkstand/collection-details',
    exact: true,
    auth: false,
  },
  {
    path: '/custom-query',
    component: 'checkstand/custom-query',
    exact: true,
    auth: false,
  },
];
export default constantsRoutes;
