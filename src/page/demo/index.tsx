import { Button, Modal, WhiteSpace, WingBlank } from 'antd-mobile';
import React from 'react';
import { useHistory } from 'react-router';

const DemoPage = () => {
  const history = useHistory();
  return (
    <div style={{ width: '100%' }}>
      <WingBlank>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/page1')}>
          前往
        </Button>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.push('/purchase-list')}>
          前往商品列表
        </Button>
        <WhiteSpace />
        <Button
          type="primary"
          onClick={() => history.push('/collection-assistant')}
        >
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
              [
                { text: 'Cancel', onPress: () => console.log('cancel') },
                { text: 'Ok', onPress: () => console.log('ok') },
              ]
            );
          }}
        >
          弹窗2
        </Button>
      </WingBlank>
    </div>
  );
};

export default DemoPage;
