/*
 *@author: caomengli
 *@desc 收款记录
 *@Date: 2021-05-17 15:12:49
 */
import React from 'react';
import { Flex, Icon, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './index.less';
import { getDateCollectionList } from '@src/apis/checkstand';
import { FListView } from '@src/component';
const PREFIX = 'collection-records';
const CollectionRecordsPage = () => {
  const history = useHistory();

  return (
    <div style={{ width: '100%' }} className={`${PREFIX}`}>
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => history.goBack()}>
        收款记录
      </NavBar>
      <WhiteSpace />
      <WingBlank>
        <div className={`${PREFIX}-total-amount`}>
          <span>5笔收款</span>
          <span>合计 ¥3147.00</span>
        </div>
        <FListView
          queryApi={getDateCollectionList}
          initialParam={{}}
          row={(data, sectionId, rowId) => (
            <Link to="/collection-details">
              <Flex justify="between" className="records-item">
                <div>
                  <p>交易收款</p>
                  <p className="time">12:09:34</p>
                </div>
                <p className="money">89.00</p>
              </Flex>
            </Link>
          )}
        />
      </WingBlank>
    </div>
  );
};

export default CollectionRecordsPage;
