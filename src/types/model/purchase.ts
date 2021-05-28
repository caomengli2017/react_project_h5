import {
  GET_BRANDS_LIST,
  SET_ADDRESS,
  SET_BRANDS_LIST,
  SET_SHOPPING_CART,
} from '@src/redux/constants/purchaseConstant';
import { IAddressListModal } from '.';

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
export type ISetAddressAction = {
  type: typeof SET_ADDRESS;
  data: IAddressListModal;
};
export type IPurchaseAction =
  | IGetBrandsListAction
  | ISetBrandsListAction
  | ISetShoppingCartAction
  | ISetAddressAction;

export interface IpurchaseReducer {
  brands: IBrandsListModal; //品牌列表
  shoppingCart: number; //购物车数量
  address?: IAddressListModal;
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

export interface ISpec {
  k: string;
  v: string;
}

export interface IProduct {
  image?: string;
  id: number | string;
  bn: string;
  price: PruductPrice;
  specs: ISpec[];
  quantity?: number;
}

export interface IGoodsDetailsModal {
  id: number;
  bn: string;
  name: string;
  price: Price;
  images: GoodsImage[];
  products: IProduct[];
  desc: string;
}
export interface ICartModal {
  countItem: number;
  countTotal: number;
}

export interface RetailPrice {
  unit: string;
  sign: string;
  value: number;
}

export interface OriginalPrice {
  unit: string;
  sign: string;
  value: number;
}

export interface PerDiscount {
  unit: string;
  sign: string;
  value: number;
}

export interface DiscountedPrice {
  unit: string;
  sign: string;
  value: number;
}

export interface OriginalSubtotal {
  unit: string;
  sign: string;
  value: number;
}

export interface DiscountedSubtotal {
  unit: string;
  sign: string;
  value: number;
}

export interface Product {
  identifier: string;
  bn: string;
  id: number;
  productId: number;
  type: string;
  quantity: number;
  checked: boolean;
  image: string;
  specs: ISpec[];
  weight: number;
  retailPrice: RetailPrice;
  originalPrice: OriginalPrice;
  perDiscount: PerDiscount;
  discountedPrice: DiscountedPrice;
  originalSubtotal: OriginalSubtotal;
  discountedSubtotal: DiscountedSubtotal;
  marketable: boolean;
}
export interface AvailableItem {
  goodsId: number;
  type: string;
  name: string;
  image: string;
  products: Product[];
}
export interface Items {
  availableItems: AvailableItem[];
  unavailableItems: AvailableItem[];
}

export interface GoodsFee {
  unit: string;
  sign: string;
  value: number;
}

export interface ShippingFee {
  unit: string;
  sign: string;
  value: number;
}

export interface TotalAmount {
  unit: string;
  sign: string;
  value: number;
}

export interface Total {
  goodsFee: GoodsFee;
  shippingFee: ShippingFee;
  totalAmount: TotalAmount;
  weight: number;
  netWeight: number;
  countItem: number;
  countTotal: number;
  selectedCountItem: number;
  selectedCountTotal: number;
}

export interface ICartListModal {
  items: Items;
  total: Total;
}
export interface IPayMethodsModal {
  list: {
    id: number;
    name: string;
  }[];
}
export interface Money {
  unit: string;
  sign: string;
  value: string;
}

export interface PayMethod {
  id: number;
  name: string;
  desc: string;
}

export interface IPayOrderModal {
  procureOrderCode: string;
  money: Money;
  createdAt: string;
  paymentDeadline: string;
  paymentLeftTime: number;
  payMethods: PayMethod[];
}
export interface PaidMoney {
  unit: string;
  sign: string;
  value: string;
}

export interface PayMethod2 {
  id: number;
  name: string;
}

export interface IPayResultModal {
  paySuccess: boolean;
  payStatus: string;
  paidMoney: PaidMoney;
  procureOrderCode: string;
  payMethod: PayMethod2;
}
