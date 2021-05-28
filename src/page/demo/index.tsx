import { Button, Modal, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';
import { useHistory } from 'react-router';
import bridgeJs from '@src/utils/bridge';
import Cookies from 'js-cookie';

const DemoPage = () => {
  const history = useHistory();

  return (
    <div style={{ width: '100%' }}>
      <WingBlank>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={() => {
            bridgeJs.Core.callNativeHandler({
              actionName: 'abc',
              actionArgs: ['CheckSendPackageActivity'],
            });
          }}
        >
          安卓测试
        </Button>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/purchase-list')}>
          前往商品列表
        </Button>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/car-page')}>
          前往购物车
        </Button>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/order-page')}>
          前往订单页面
        </Button>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/address-list-page')}>
          前往地址页面
        </Button>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/pay-page')}>
          前往支付页面
        </Button>

        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/collection-assistant')}>
          前往收银台销售助手
        </Button>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={() => {
            Modal.alert(
              null,
              <div>
                <p>消息消息消息消息消息</p>
              </div>
            );
          }}
        >
          弹窗1
        </Button>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={() => {
            Modal.alert(
              null,
              <div>
                <p>消息消息消息消息消息</p>
              </div>,
              [{ text: 'Cancel' }, { text: 'Ok' }]
            );
          }}
        >
          弹窗2
        </Button>
        <WhiteSpace />
        <p>{Cookies.get('uuid')}</p>
      </WingBlank>
    </div>
  );
};

export default DemoPage;
