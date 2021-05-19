/*
 *@author: caomengli
 *@desc 交易详情
 *@Date: 2021-05-17 16:57:51
 */

import React from 'react';
import { Flex, Icon, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { useHistory } from 'react-router';
import './index.less';
const PREFIX = 'collection-details';
const CollectionDetailsPage = () => {
  const history = useHistory();

  return (
    <div style={{ width: '100%' }} className={`${PREFIX}`}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        交易详情
      </NavBar>
      <WhiteSpace />
      <WingBlank>
        <p className="money">89.00</p>
        <Flex justify="between" className="detials-content">
          <p>当前状态</p>
          <p>已收款</p>
        </Flex>
        <Flex justify="between" className="detials-content">
          <p>收款时间</p>
          <p>2021-03-03 12：34：23</p>
        </Flex>
        <Flex justify="between" className="detials-content">
          <p>订单金额</p>
          <p>89.00</p>
        </Flex>
        <Flex justify="between" className="detials-content">
          <p>交易订单号</p>
          <p>3456ERTFHGJNBM45U7</p>
        </Flex>
        <Flex justify="between" className="detials-content">
          <p>商户订单号</p>
          <p>656548676553654</p>
        </Flex>
      </WingBlank>
    </div>
  );
};

export default CollectionDetailsPage;
