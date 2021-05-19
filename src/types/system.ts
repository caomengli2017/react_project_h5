import { RouteProps } from 'react-router';

export interface IRouteConfigs
  extends Omit<RouteProps, 'component' | 'render' | 'children'> {
  component: string;
  auth: boolean;
  children?: IRouteConfigs[];
}

export interface IPageRes<T = any> {
  total: number;
  list: T[];
  page: number;
  size: number;
  totalPage: number;
}
