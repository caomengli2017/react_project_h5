import React, { useMemo } from 'react';
import './App.less';
import { FIntlProvider, FRouteView } from './component';
import history from './router/route-root';
import { ConnectedRouter } from 'connected-react-router';
import constantsRoutes from './router/route-config';
import { buildRouteNode } from './router/route-tool';

const App = () => {
  const routes = useMemo(() => {
    return <FRouteView animation={true}>{buildRouteNode(constantsRoutes)}</FRouteView>;
  }, []);

  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <FIntlProvider>{routes}</FIntlProvider>
      </ConnectedRouter>
    </div>
  );
};

export default App;
