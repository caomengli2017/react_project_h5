import { FListView } from '@src/component';
import { Badge, Icon, NavBar, Tabs, WingBlank } from 'antd-mobile';
import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './index.less';
import { IRootState } from '../../../redux/reducers/index';
import {
  getBrandsListAction,
  // setShoppingCartAction,
} from '@src/redux/actions/purchase';
import { IGoodsListModal } from '@src/types/model/purchase';
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { getGoodsList } from '@src/apis/purchase';
import { useHistory } from 'react-router-dom';
/**
 *
 * @author Leo
 * @desc 采购商品列表
 * @date 2021-05-14 13:53:54
 */

const PREFIX = 'f-purchase-list';

const PurchaseListPage = () => {
  const history = useHistory();
  const { brands, shoppingCart } = useSelector(
    (state: IRootState) => state.purchase
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getBrandsListAction());
  }, [dispatch]);

  const tabs = useMemo(() => {
    return brands.map((e, index) => ({ title: e.name, sub: index }));
  }, [brands]);

  const tabPane = useMemo(() => {
    return brands.map((e, index) => (
      <FListView<IGoodsListModal>
        key={_.uniqueId('tabpane_')}
        queryApi={getGoodsList}
        initialParam={{ brandId: e.id }}
        row={(data, sectionId, rowId) => (
          <WingBlank key={rowId}>
            <div className={`${PREFIX}-item`}>
              <div className={`${PREFIX}-item-img`}>
                <img src={data.image} alt="logo" />
              </div>
              <div className={`${PREFIX}-item-main`}>
                <span className={`${PREFIX}-item-main-title`}>{data.name}</span>
                <div className={`${PREFIX}-item-main-price`}>
                  <strong>
                    {data.price.sign} {data.price.value}
                  </strong>
                  <PlusOutlined
                    onClick={() => {
                      history.push('/purchase-details');
                      // dispatch(setShoppingCartAction(7));
                    }}
                  />
                </div>
              </div>
            </div>
          </WingBlank>
        )}
      />
    ));
  }, [brands, history]);
  return (
    <div className={PREFIX}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={
          <Badge hot text={shoppingCart}>
            <ShoppingCartOutlined style={{ fontSize: 25 }} />
          </Badge>
        }
      >
        商品列表
      </NavBar>
      <Tabs tabs={tabs}>{tabPane}</Tabs>
    </div>
  );
};

export default PurchaseListPage;
