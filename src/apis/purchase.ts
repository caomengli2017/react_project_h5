import {
  IBrandsModal,
  ICartListModal,
  ICartModal,
  IGoodsDetailsModal,
  IGoodsListModal,
  IPayMethodsModal,
  IPayOrderModal,
  IPayResultModal,
} from '@src/types/model/purchase';
import { IPageRes } from '@src/types/system';
import HttpApi from '@src/utils/https';

// 获取品牌列表
export function getBrandList() {
  return HttpApi.request<IBrandsModal>({
    url: '/cart/brands/list',
    method: 'POST',
  });
}
// 获取商品列表
export function getGoodsList(data: any) {
  return HttpApi.request<IPageRes<IGoodsListModal>>({
    url: '/cart/goods/list',
    method: 'POST',
    data,
  });
}
// 获取商品详情
export function getGoodsDetails(goodsId: number) {
  return HttpApi.request<IGoodsDetailsModal>({
    url: '/cart/goods/detail',
    method: 'POST',
    data: {
      goodsId,
    },
  });
}
// 加入购物车
export function addCart(data: any) {
  return HttpApi.request<ICartModal>({
    url: '/cart/add',
    method: 'POST',
    data,
  });
}
// 获取购物车列表
export function getCartList() {
  return HttpApi.request<ICartListModal>({
    url: '/cart',
    method: 'POST',
  });
}
// 更新选择状态
export function updateChecked(data: any) {
  return HttpApi.request<ICartListModal>({
    url: '/cart/update-checked',
    method: 'POST',
    data,
  });
}
//删除购物车
export function deleteCart(data: any) {
  return HttpApi.request<ICartListModal>({
    url: '/cart/remove',
    method: 'POST',
    data,
  });
}
//清空购物车
export function deleteCartAll() {
  return HttpApi.request<ICartListModal>({
    url: '/cart/remove-all',
    method: 'POST',
  });
}
//更新购物车数量
export function updateNum(data: any) {
  return HttpApi.request<ICartListModal>({
    url: '/cart/update-quantity',
    method: 'POST',
    data,
  });
}
//获取订单明细
export function getOrderInfo(data?: any) {
  return HttpApi.request<ICartListModal>({
    url: '/checkout/items',
    method: 'POST',
    data,
  });
}

export function getPayMethodsList(data?: any) {
  return HttpApi.request<IPayMethodsModal>({
    url: '/checkout/pay-methods',
    method: 'POST',
    data,
  });
}
//创建订单
export function createOrder(data?: any) {
  return HttpApi.request({
    url: '/checkout/create-order',
    method: 'POST',
    data,
  });
}
//获取支付信息
export function getPayOrderInfo(id: string) {
  return HttpApi.request<IPayOrderModal>({
    url: '/pay-center/procure-order',
    method: 'POST',
    data: {
      procureOrderCode: id,
    },
  });
}
// 支付
export function PayOrder(data: any) {
  return HttpApi.request<IPayResultModal>({
    url: '/pay-center/procure-order/pay',
    method: 'POST',
    data,
    errorAuth: false,
  });
}
// 获取购物车数量
export function getCartNum() {
  return HttpApi.request({
    url: '/cart/count',
    method: 'POST',
  });
}
