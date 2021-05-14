import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button, WhiteSpace, WingBlank } from 'antd-mobile';

const Page1 = () => {
  const history = useHistory();
  return (
    <div style={{ width: '100%' }}>
      <WingBlank>
        <WhiteSpace />
        <Button type="primary" onClick={() => history.goBack()}>
          返回
        </Button>
      </WingBlank>
    </div>
  );
};

export default Page1;
