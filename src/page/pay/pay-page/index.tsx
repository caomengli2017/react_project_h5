import { getPayOrderInfo, PayOrder } from '@src/apis/purchase';
import { FCheckbox } from '@src/component';
import { Button, Icon, Modal, NavBar, Toast } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import './index.less';
import { IPayOrderModal } from '../../../types/model/purchase';
import { useCountDown } from 'ahooks';
import { BaseHttpModel } from '@src/utils/https';
import queryString from 'query-string';

const PREFIX = 'f-pay-page';
type IParams = { id: string };
const PayPage = () => {
  const history = useHistory();
  const params = useParams<IParams>();
  const [data, setdata] = useState<IPayOrderModal>();
  const [countdown, setTargetDate, formattedRes] = useCountDown();
  const { hours, minutes, seconds } = formattedRes;
  const [select, setSelect] = useState<number>();
  useEffect(() => {
    getPayOrderInfo(params.id).then((res) => {
      setdata(res.data);
      setTargetDate(res.data.paymentDeadline);
      setSelect(res.data.payMethods[0].id);
    });
  }, [params, setTargetDate]);
  const PayErrorModal1 = (res: BaseHttpModel) => {
    Modal.alert('提示', res.msg, [
      { text: '取消' },
      {
        text: '确定',
        onPress: () => {},
      },
    ]);
  };
  const handlePay = () => {
    Modal.prompt(
      '密码',
      '请输入支付密码',
      [
        { text: '取消' },
        {
          text: '确认',
          onPress: (password) => {
            return new Promise((resolve) => {
              if (password.length < 6) {
                Toast.info('请输入支付密码', 2);
              } else {
                PayOrder({
                  procureOrderCode: params.id,
                  payMethodId: select,
                  payPassword: password,
                })
                  .then((res) => {
                    resolve(1);
                    history.push({
                      pathname: '/pay-result-page',
                      search: queryString.stringify(res.data),
                    });
                  })
                  .catch((err) => {
                    resolve(1);
                    // history.push({
                    //   pathname: '/pay-result-page',
                    //   search: queryString.stringify({
                    //     data: JSON.stringify({
                    //       paySuccess: true,
                    //       payStatus: 'success',
                    //       paidMoney: {
                    //         unit: 'CNY',
                    //         sign: '￥',
                    //         value: '24962.40',
                    //       },
                    //       procureOrderCode: 'PD20210518026603912',
                    //       payMethod: {
                    //         id: 1,
                    //         name: '授信额度',
                    //       },
                    //     }),
                    //   }),
                    // });
                    if (err.code === 44003) {
                      PayErrorModal1(err);
                    }
                  });
              }
            });
          },
        },
      ],
      'secure-text'
    );
  };
  return (
    <div className={PREFIX}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        收银台
      </NavBar>
      <div className={`${PREFIX}-body`}>
        <div className={`${PREFIX}-body-box`}>
          <span>待付款金额</span>
          <strong>
            {data?.money.sign} {data?.money.value}
          </strong>
        </div>
        <div className={`${PREFIX}-body-method`}>
          <p>付款方式</p>
          {data?.payMethods.map((e) => (
            <FCheckbox
              key={e.id}
              checked={e.id === select}
              onChange={(val) => {
                if (val) setSelect(e.id);
              }}
            >
              <div className={`${PREFIX}-body-method-main`}>
                <strong>{e.name}</strong>
                <p>{e.desc}</p>
              </div>
            </FCheckbox>
          ))}
        </div>
        {countdown > 0 && (
          <div className={`${PREFIX}-body-time`}>
            请在{hours}小时{minutes}分{seconds}秒内完成付款
          </div>
        )}
      </div>
      <footer className={`${PREFIX}-footer`}>
        <div>
          <Button
            style={{ backgroundColor: '#111' }}
            type="primary"
            onClick={handlePay}
          >
            支付
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default PayPage;
