import React, { useMemo } from 'react';
import './App.less';
import {
  FIntlProvider,
  FNotistackWrapper,
  FRouteView,
  FThemeProvider,
} from './component';
import history from './router/route-root';
import { ConnectedRouter } from 'connected-react-router';
import constantsRoutes from './router/route-config';
import { buildRouteNode } from './router/route-tool';
import { Box } from '@material-ui/core';

const App = () => {
  const routes = useMemo(() => {
    return (
      <FRouteView animation={true}>
        {buildRouteNode(constantsRoutes)}
      </FRouteView>
    );
  }, []);

  return (
    <Box className="App">
      <ConnectedRouter history={history}>
        <FThemeProvider>
          <FNotistackWrapper>
            <FIntlProvider>{routes}</FIntlProvider>
          </FNotistackWrapper>
        </FThemeProvider>
      </ConnectedRouter>
    </Box>
  );
};

export default App;
