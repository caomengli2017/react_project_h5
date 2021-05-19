import {
  GET_BRANDS_LIST,
  SET_BRANDS_LIST,
  SET_SHOPPING_CART,
} from '@src/redux/constants/purchaseConstant';

export type ISetBrandsListAction = {
  type: typeof SET_BRANDS_LIST;
  data: IBrandsListModal;
};
export type IGetBrandsListAction = {
  type: typeof GET_BRANDS_LIST;
};
export type ISetShoppingCartAction = {
  type: typeof SET_SHOPPING_CART;
  data: number;
};
export type IPurchaseAction =
  | IGetBrandsListAction
  | ISetBrandsListAction
  | ISetShoppingCartAction;

export interface IpurchaseReducer {
  brands: IBrandsListModal; //品牌列表
  shoppingCart: number; //购物车数量
}

export interface IBrandsList {
  id: number;
  name: string;
}
export type IBrandsListModal = IBrandsList[];
export interface IBrandsModal {
  list: IBrandsListModal;
}
export interface Price {
  unit: string;
  sign: string;
  value: number;
}

export interface IGoodsListModal {
  id: number;
  name: string;
  image: string;
  price: Price;
}
export interface Price {
  unit: string;
  sign: string;
  value: number;
}

export interface GoodsImage {
  image: string;
}

export interface PruductPrice {
  unit: string;
  sign: string;
  value: number;
}

export interface Spec {
  k: string;
  v: string;
}

export interface Product {
  id: number;
  bn: string;
  price: PruductPrice;
  specs: Spec[];
}

export interface IGoodsDetailsModal {
  id: number;
  bn: string;
  name: string;
  price: Price;
  images: GoodsImage[];
  products: Product[];
  desc: string;
}
