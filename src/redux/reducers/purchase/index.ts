// import { IUserAction } from '../../actions/user';
import { IPurchaseAction, IpurchaseReducer } from '@src/types/model/purchase';
import { SET_BRANDS_LIST, SET_SHOPPING_CART, SET_ADDRESS } from '../../constants/purchaseConstant';

const localState = localStorage.getItem('PURCHASE');
const initState: IpurchaseReducer = localState
  ? JSON.parse(localState)
  : {
      brands: [],
      shoppingCart: 0,
    };

const purchaseReducer = (state = initState, action: IPurchaseAction): IpurchaseReducer => {
  switch (action.type) {
    case SET_BRANDS_LIST:
      return { ...state, brands: action.data };
    case SET_SHOPPING_CART:
      return { ...state, shoppingCart: action.data };
    case SET_ADDRESS:
      return { ...state, address: action.data };
    default:
      return state;
  }
};
export default purchaseReducer;
