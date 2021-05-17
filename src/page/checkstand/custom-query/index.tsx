/*
 *@author: caomengli
 *@desc 自定义查询
 *@Date: 2021-05-17 18:18:16
 */
import React from 'react';
import { Flex, NavBar, WhiteSpace, WingBlank } from 'antd-mobile';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom';
import './index.less';
const PREFIX = 'custom-query';
const CustomQueryPage = () => {
  const history = useHistory();

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
    </div>
  );
};

export default CustomQueryPage;
