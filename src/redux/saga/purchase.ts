// import { getMenuList } from '@src/apis/system/menu';
import { getBrandList } from '@src/apis/purchase';
import { IGetBrandsListAction } from '@src/types/model/purchase';
import { CallReturnType } from '@src/types/saga';
import { call, put, takeLatest } from 'redux-saga/effects';
import { setBrandsListAction } from '../actions/purchase';
import { GET_BRANDS_LIST } from '../constants/purchaseConstant';

function* asyncGetBrandsList(params: IGetBrandsListAction) {
  try {
    const brands: CallReturnType<typeof getBrandList> = yield call(getBrandList);
    yield put(setBrandsListAction(brands.data.list));
  } catch (error) {}
}

const rootPurchase = [takeLatest(GET_BRANDS_LIST, asyncGetBrandsList)];
export default rootPurchase;
