// import { IUserAction } from '../../actions/user';
import {
  GET_USER_DATA,
  SET_USER_DATA,
  GET_DATA_ERROR,
  LOGOUT,
} from '../../constants/userConstant';
import { IUserReducer } from './types';

const localState = sessionStorage.getItem('USER_DATA');
const initState: IUserReducer = localState
  ? JSON.parse(localState)
  : {
      username: '',
      menus: [],
      login: false,
      loading: false,
    };

const userReducer = (state = initState, action: any): IUserReducer => {
  switch (action.type) {
    case GET_USER_DATA:
      state.loading = true;
      return Object.assign({}, state, { loading: true, error: undefined });
    case SET_USER_DATA:
      const newState = Object.assign({}, state, action.data, {
        loading: false,
        login: true,
        error: undefined,
      });
      sessionStorage.setItem('USER_DATA', JSON.stringify(newState));
      return newState;
    case GET_DATA_ERROR:
      return Object.assign({}, state, { loading: false, error: action.data });
    case LOGOUT:
      sessionStorage.removeItem('USER_DATA');
      return { ...state, login: false };
    default:
      return state;
  }
};
export default userReducer;
