import { IPageRes } from '@src/types/system';
import HttpApi from '@src/utils/https';

// 获取全部收款列表
export function getAllCollectionList(data: any) {
  return HttpApi.request<IPageRes>({
    url: '/collection/all/list',
    method: 'POST',
    data,
  });
}

// 获取日收款记录
export function getDateCollectionList(data: any) {
  return HttpApi.request<IPageRes>({
    url: '/collection/date/list',
    method: 'POST',
    data,
  });
}
