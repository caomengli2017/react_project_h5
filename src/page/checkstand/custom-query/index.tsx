/*
 *@author: caomengli
 *@desc 自定义查询
 *@Date: 2021-05-17 18:18:16
 */
import React, { useState } from 'react';
import {
  DatePicker,
  Flex,
  List,
  NavBar,
  WhiteSpace,
  WingBlank,
} from 'antd-mobile';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './index.less';
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
        icon={<i className="icon iconfont icon-fanhui"></i>}
        onLeftClick={() => history.goBack()}
      >
        自定义查询
      </NavBar>
      <WhiteSpace />
      <WingBlank>
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
      </WingBlank>
      <WhiteSpace />
      <WingBlank>aflafjkla</WingBlank>
    </div>
  );
};

export default CustomQueryPage;
