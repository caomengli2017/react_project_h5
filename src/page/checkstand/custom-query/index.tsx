/*
 *@author: caomengli
 *@desc 自定义查询
 *@Date: 2021-05-17 18:18:16
 */
import React, { useState } from 'react';
import {
  Button,
  DatePicker,
  Flex,
  Icon,
  List,
  NavBar,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './index.less';
import { FListView } from '@src/component';
import { getDateCollectionList } from '@src/apis/checkstand';
const PREFIX = 'custom-query';
const CustomQueryPage = () => {
  const history = useHistory();
  const [queryMode, setQueryMode] = useState('');
  const queryModeList = [
    { mode: 'date', name: '昨日' },
    { mode: 'week', name: '本周' },
    { mode: 'month', name: '本月' },
  ];
  const switchMode = (mode: React.SetStateAction<string>) => {
    setQueryMode(mode);
  };

  return (
    <div style={{ width: '100%' }} className={`${PREFIX}`}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        自定义查询
      </NavBar>
      <WhiteSpace />
      <WingBlank className={`${PREFIX}-date`}>
        <ul className="custom-time">
          {queryModeList.map((item) => (
            <li
              onClick={() => switchMode(item.mode)}
              key={item.mode}
              className={item.mode === queryMode ? 'active' : ''}
            >
              {item.name}
            </li>
          ))}
        </ul>
        <p className="label">日期选择</p>
        <List className="time-picker-list">
          <DatePicker>
            <List.Item>开始时间</List.Item>
          </DatePicker>
          <DatePicker>
            <List.Item>结束时间</List.Item>
          </DatePicker>
        </List>
        <Button type="primary" className="query-btn">
          查询
        </Button>
      </WingBlank>
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

export default CustomQueryPage;
