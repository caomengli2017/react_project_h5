import { FListView } from '@src/component';
import { Icon, NavBar, Tabs } from 'antd-mobile';
import React from 'react';
import './index.less';
/**
 *
 * @author Leo
 * @desc 采购商品列表
 * @date 2021-05-14 13:53:54
 */

const PREFIX = 'f-purchase-list';
const tabs = [
  { title: 'Vifun', sub: 1 },
  { title: 'Elfbar', sub: 2 },
];
const PurchaseListPage = () => {
  return (
    <div className={PREFIX}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => console.log('onLeftClick')}
        rightContent={[<Icon key="1" type="ellipsis" />]}
      >
        商品列表
      </NavBar>
      <Tabs tabs={tabs}>
        <FListView<Number>
          queryApi="123"
          row={(data, sectionId, rowId) => <div key={rowId}>{data}</div>}
        />
        <FListView<String>
          queryApi="222"
          row={(data, sectionId, rowId) => <div key={rowId}>{data}</div>}
        />
      </Tabs>
    </div>
  );
};

export default PurchaseListPage;
