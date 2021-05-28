import { Button, Icon, List, Modal, NavBar, Picker, TextareaItem } from 'antd-mobile';
import React, { memo, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';
import { RightOutlined } from '@ant-design/icons';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FSpecItem } from '@src/component';
import { createOrder, getOrderInfo, getPayMethodsList } from '@src/apis/purchase';
import { AvailableItem, ICartListModal, Total } from '@src/types/model/purchase';
import { useSelector } from 'react-redux';
import { IRootState } from '@src/redux/reducers';
import { PickerData } from 'antd-mobile/lib/picker/PropsType';
import { IAddressListModal } from '../../../types/model/index';

/**
 *
 * @author Leo
 * @desc 订单页面
 * @date 2021-05-20 15:04:46
 */

const PREFIX = 'f-order-page';
const OrderPage = () => {
  const history = useHistory();
  const [data, setData] = useState<ICartListModal>();
  const { address } = useSelector((state: IRootState) => state.purchase);
  const [payId, setpayId] = useState<number>();
  const [text, setText] = useState<string>();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    getOrderInfo().then((res) => {
      setData(res.data);
    });
  }, []);
  const handleSubmit = () => {
    if (!address) {
      Modal.alert('提示', '您还没有选择收货地址，请先选择收货地址', [
        {
          text: '确定',
        },
      ]);
      return;
    }
    setloading(true);
    createOrder({
      addressId: address?.oid,
      payMethodId: payId,
      customerMessage: text,
    })
      .then((res) => {
        history.push(`/pay-page/${res.data.procureOrderCode}`);
      })
      .finally(() => {
        setloading(false);
      });
  };
  return (
    <div className={PREFIX}>
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => history.goBack()}>
        确认订单
      </NavBar>
      <div className={`${PREFIX}-body`}>
        <AddressView address={address} />
        <PayView onChange={(e) => setpayId(e)} />
        <GoodsView data={data?.items.availableItems} />
        <TextareaView onChange={(e) => setText(e)} />
        <TotalView data={data?.total} />
      </div>
      <footer className={`${PREFIX}-footer`}>
        <div>
          <span>应付(含运费):</span>
          <span>
            {data?.total.totalAmount.sign} {data?.total.totalAmount.value}
          </span>
        </div>
        <div>
          <Button disabled={loading} type="primary" onClick={handleSubmit}>
            提交订单
          </Button>
        </div>
      </footer>
    </div>
  );
};
type IAddressViewProp = {
  address?: IAddressListModal;
};
const AddressView = ({ address }: IAddressViewProp) => {
  const history = useHistory();
  return (
    <div className={`${PREFIX}-address`} onClick={() => history.push('/address-list-page')}>
      <span className={`${PREFIX}-address-dec`}></span>
      <div className={`${PREFIX}-address-body`}>
        {address && (
          <div className={`${PREFIX}-address-body-main`}>
            <div>
              <span>{address?.storeName}</span>
            </div>
            <p>{address?.address}</p>
            <p>{address?.addressDetail}</p>
            <p>
              <span>{address?.name}</span> <span>{address?.tel}</span>
            </p>
          </div>
        )}
        {!address && <h3>请填写收货地址</h3>}
        <div className={`${PREFIX}-address-body-arrow`}>
          <RightOutlined />
        </div>
      </div>
    </div>
  );
};
interface IPayViewProp {
  onChange(e: number): void;
}
const PayView = ({ onChange }: IPayViewProp) => {
  const [data, setdata] = useState<PickerData[]>([]);
  const [select, setSelect] = useState(0);
  useEffect(() => {
    getPayMethodsList().then((res) => {
      const list = res.data.list.map((e) => ({ label: e.name, value: e.id }));
      setdata(list);
      setSelect(list[0].value);
      onChange(list[0].value);
    });
  }, [onChange]);
  const extar = useMemo(() => {
    const value = data.find((e) => e.value === select);
    if (value) {
      return value.label as string;
    } else {
      return '请选择支付方式';
    }
  }, [select, data]);
  return (
    <div className={`${PREFIX}-pay`}>
      <Picker
        extra={extar}
        data={data}
        cols={1}
        title="支付方式"
        onOk={(e) => {
          setSelect(e[0]);
          onChange(e[0]);
        }}
      >
        <List.Item arrow="horizontal">支付方式</List.Item>
      </Picker>
    </div>
  );
};
type IGoodsViewProps = {
  data?: AvailableItem[];
};
const GoodsView = memo(({ data }: IGoodsViewProps) => {
  return (
    <React.Fragment>
      {data?.map((val) => {
        return (
          <div key={val.goodsId} className={`${PREFIX}-goods`}>
            <div className={`${PREFIX}-goods-header`}>
              <div className={`${PREFIX}-goods-header-img`}>
                <LazyLoadImage width="100%" src={val.image} />
              </div>
              <div className={`${PREFIX}-goods-header-main`}>
                <h3>{val.name}</h3>
              </div>
            </div>
            {val.products?.map((item) => {
              const _data = {
                id: item.identifier || 0,
                bn: item.bn,
                price: item.discountedPrice,
                specs: item.specs,
                quantity: item.quantity,
              };
              return (
                <FSpecItem
                  key={item.identifier}
                  data={_data}
                  rightNode={(e) => <span style={{ fontSize: 13, fontWeight: 600 }}>x30</span>}
                />
              );
            })}
          </div>
        );
      })}
    </React.Fragment>
  );
});
type ITextareaViewProp = {
  onChange(e?: string): void;
};
const TextareaView = ({ onChange }: ITextareaViewProp) => {
  return (
    <div className={`${PREFIX}-text`}>
      <TextareaItem
        name="留言:"
        placeholder="您有什么需求，可以在这里留言！(200字内）"
        count={200}
        rows={3}
        style={{ fontSize: 13 }}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
};
type ITotalViewProp = {
  data?: Total;
};
const TotalView = ({ data }: ITotalViewProp) => {
  return (
    <div className={`${PREFIX}-total`}>
      <div>
        <span>运费总结</span>
        <strong>
          {data?.shippingFee.sign} {data?.shippingFee.value}
        </strong>
      </div>
      <div>
        <span>物品数量总计</span>
        <strong>{data?.countTotal}</strong>
      </div>
      <div>
        <span>物品费总计</span>
        <strong>
          {data?.goodsFee.sign} {data?.goodsFee.value}
        </strong>
      </div>
      {/* <div>
        <span>优惠总计</span>
        <strong>$299</strong>
      </div> */}
      <div>
        <span>应付总计</span>
        <strong style={{ color: '#FF5000' }}>
          {data?.totalAmount.sign} {data?.totalAmount.value}
        </strong>
      </div>
    </div>
  );
};
export default OrderPage;
