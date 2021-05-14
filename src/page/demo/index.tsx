import { Button, WhiteSpace, WingBlank } from 'antd-mobile';
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
      </WingBlank>
    </div>
  );
};

export default DemoPage;
