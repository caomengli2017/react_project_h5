import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import userReducer from './user/index';
import history from '@src/router/route-root';
import purchaseReducer from './purchase/index';

const rootReducer = combineReducers({
  router: connectRouter(history),
  user: userReducer,
  purchase: purchaseReducer,
});
export type IRootState = ReturnType<typeof rootReducer>;
export default rootReducer;
