import { RouteProps } from 'react-router';

export interface IRouteConfigs
  extends Omit<RouteProps, 'component' | 'render' | 'children'> {
  component: string;
  auth: boolean;
  children?: IRouteConfigs[];
}
