import { lazy, ReactNode } from 'react';
import { Redirect, Route } from 'react-router-dom';
import _ from 'lodash';
import { IRouteConfigs } from '@src/types/system';
import store from '@src/redux/store';
import { RouteProps } from 'react-router';

export const buildRouteNode = (config: Array<IRouteConfigs>): ReactNode[] => {
  let routes: ReactNode[] = [];
  const { login } = store.getState().user;
  routes = config.map((e, index) => {
    const DynamicComponent = lazy(() => import(`@src/page/${e.component}`));
    const attirbute: RouteProps = {
      path: e.path,
      exact: e.exact,
      render: (props: any) => {
        // 验证登录 拦截
        if (e.auth && login === false) {
          return <Redirect to="/login" />;
        }
        // 子路由嵌套
        if (_.isArray(e.children) && e.children.length > 0) {
          return (
            <DynamicComponent {...props}>
              {e.children && buildRouteNode(e.children)}
            </DynamicComponent>
          );
        } else {
          return <DynamicComponent {...props} />;
        }
      },
    };
    return <Route key={_.uniqueId('route_')} {...attirbute} />;
  });
  routes.push(
    <Route
      path={'*'}
      key={'404'}
      render={(prop) => {
        return <Redirect to="/404" />;
      }}
    />
  );
  return routes;
};
