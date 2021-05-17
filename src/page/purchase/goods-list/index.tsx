/*
 *@author: caomengli
 *@desc 商品列表
 *@Date: 2021-05-14 17:17:49
 */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Badge, NavBar, Tabs, WingBlank } from 'antd-mobile';

const GoodsListPage = () => {
  const history = useHistory();
  const tabs = [{ title: 'Vifun' }, { title: 'Elfbar' }];
  return (
    <div style={{ width: '100%' }}>
      <NavBar
        mode="light"
        icon={<i className="icon iconfont icon-fanhui"></i>}
        onLeftClick={() => history.goBack()}
        rightContent={
          <Badge text={100} overflowCount={99}>
            <i className="icon iconfont icon-gouwuche"></i>
          </Badge>
        }
      >
        商品列表
      </NavBar>
      <Tabs
        tabs={tabs}
        initialPage={1}
        onChange={(tab, index) => {
          console.log('onChange', index, tab);
        }}
        onTabClick={(tab, index) => {
          console.log('onTabClick', index, tab);
        }}
      >
        <WingBlank>Content of first tab</WingBlank>
        <WingBlank>Content of second tab</WingBlank>
      </Tabs>
    </div>
  );
};

export default GoodsListPage;
