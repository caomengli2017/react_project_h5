import { Button, Icon, NavBar } from 'antd-mobile';
import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './index.less';
import queryString from 'query-string';
import { IPayResultModal } from '@src/types/model/purchase';

const PREFIX = 'f-pay-result-page';

const PayResultPage = () => {
  const history = useHistory();
  const location = useLocation();
  const res = queryString.parse(location.search);
  const data: IPayResultModal = JSON.parse(res.data as string);
  return (
    <div className={PREFIX}>
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => history.goBack()}>
        收银台
      </NavBar>
      <div className={`${PREFIX}-body`}>
        {data.payStatus === 'success' && (
          <ResultView
            icon="success"
            name="支付成功"
            money={data.paidMoney.value}
            method={data.payMethod.name}
            onClick={() => {}}
          />
        )}
        {data.payStatus === 'pending' && (
          <ResultView
            icon="pending"
            name="支付中"
            msg="您的支付正在进行中，需要等待一些时间，
            请耐心等待！"
            money={data.paidMoney.value}
            method={data.payMethod.name}
            onClick={() => {}}
          />
        )}
        {data.payStatus === 'failed' && (
          <ResultView
            icon="error"
            name="支付失败"
            money={data.paidMoney.value}
            method={data.payMethod.name}
            onClick={() => {}}
          />
        )}
      </div>
    </div>
  );
};
type IResultViewProps = {
  icon: string;
  name: string;
  msg?: string;
  money: string;
  method: string;
  onClick(): void;
};
const ResultView = ({ icon, name, msg, money, method, onClick }: IResultViewProps) => {
  return (
    <div className={`${PREFIX}-result`}>
      <img src={require(`../../../assets/img/${icon}.png`)} alt="icon" />
      <h4>{name}</h4>
      {msg && <p className={`${PREFIX}-result-msg`}>{msg}</p>}
      <p>支付金额：￥{money}</p>
      <p>支付方式: {method}</p>
      <div>
        <Button
          inline
          style={{
            width: 118,
            marginRight: 12,
            fontSize: 14,
            fontWeight: 'bold',
            borderRadius: 20,
          }}
        >
          返回首页
        </Button>
        <Button
          inline
          type="primary"
          style={{
            width: 118,
            fontSize: 14,
            fontWeight: 'bold',
            borderRadius: 20,
          }}
          onClick={onClick}
        >
          查看订单详情
        </Button>
      </div>
    </div>
  );
};
export default PayResultPage;
