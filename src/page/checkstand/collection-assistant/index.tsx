/*
 *@author: caomengli
 *@desc 收款助手
 *@Date: 2021-05-17 11:43:59
 */
import React from 'react';
import { Flex, NavBar, WingBlank } from 'antd-mobile';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './index.less';
const PREFIX = 'collection-assistant';

const CollectionAssistantPage = () => {
  const history = useHistory();
  return (
    <div style={{ width: '100%' }} className={`${PREFIX}`}>
      <NavBar
        icon={<i className="icon iconfont icon-fanhui"></i>}
        onLeftClick={() => history.goBack()}
        rightContent={<Link to="/custom-query">自定义查询</Link>}
      >
        收款助手
      </NavBar>
      <div className={`${PREFIX}-top`}></div>
      <div className={`${PREFIX}-total-amount`}>
        <WingBlank>
          <p>今日收款(元)</p>
          <p className="total-amount">5,637.65</p>
        </WingBlank>
      </div>
      <div className={`${PREFIX}-collection-records`}>
        <WingBlank>
          <div className="records-title">
            <p className="date">2020-03-23</p>
            <span>5笔</span>
            <span>收入￥3147.00</span>
          </div>
          <Link to="/collection-details">
            <Flex justify="between" className="records-item">
              <div>
                <p>交易收款</p>
                <p className="time">12:09:34</p>
              </div>
              <p className="money">89.00</p>
            </Flex>
          </Link>
          <Link to="/collection-details">
            <Flex justify="between" className="records-item">
              <div>
                <p>交易收款</p>
                <p className="time">12:09:34</p>
              </div>
              <p className="money">89.00</p>
            </Flex>
          </Link>
          <div className="load-more">
            <Link to="/collection-records">
              加载全部<i className="icon iconfont icon-xiangxiajiantou"></i>
            </Link>
          </div>
        </WingBlank>
      </div>
    </div>
  );
};

export default CollectionAssistantPage;
