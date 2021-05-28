import { IAddressListModal } from '@src/types/model';
import HttpApi from '@src/utils/https';
import { IPageRes } from '../types/system';

//获取订单明细
export function getAddressList(data?: any) {
  return HttpApi.request<IPageRes<IAddressListModal>>({
    url: '/address/list',
    method: 'POST',
    data,
  });
}
