import {
  IBrandsModal,
  IGoodsDetailsModal,
  IGoodsListModal,
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
// 获取品牌列表
export function getGoodsList(data: any) {
  return HttpApi.request<IPageRes<IGoodsListModal>>({
    url: '/cart/goods/list',
    method: 'POST',
    data,
  });
}
// 获取品牌列表
export function getGoodsDetails(goodsId: number) {
  return HttpApi.request<IGoodsDetailsModal>({
    url: '/cart/goods/detail',
    method: 'POST',
    data: {
      goodsId,
    },
  });
}
