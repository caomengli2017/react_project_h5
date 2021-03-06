import { ISetAddressAction, ISetShoppingCartAction } from '../../types/model/purchase';
import { SET_SHOPPING_CART, SET_ADDRESS } from '../constants/purchaseConstant';
import { IAddressListModal } from '../../types/model/index';
import {
  IBrandsListModal,
  IGetBrandsListAction,
  ISetBrandsListAction,
} from '@src/types/model/purchase';
import { GET_BRANDS_LIST, SET_BRANDS_LIST } from '../constants/purchaseConstant';

/**
 *
 * @author Leo
 * @desc 获取品牌列表
 * @date 2021-05-17 15:20:29
 */

export const getBrandsListAction = (): IGetBrandsListAction => {
  return { type: GET_BRANDS_LIST };
};

/**
 *
 * @author Leo
 * @desc 设置品牌列表
 * @date 2021-05-17 15:20:29
 */

export const setBrandsListAction = (data: IBrandsListModal): ISetBrandsListAction => {
  return { type: SET_BRANDS_LIST, data };
};

// 设置购物车数量
export const setShoppingCartAction = (data: number): ISetShoppingCartAction => {
  return { type: SET_SHOPPING_CART, data };
};
// 设置收货地址
export const setAddressAction = (data: IAddressListModal): ISetAddressAction => {
  return { type: SET_ADDRESS, data };
};
