import { PullToRefresh } from 'antd-mobile';
import React, { FC, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { LoadingOutlined, ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons';
import './index.less';

interface IFPullToRefresh {
  dirction: 'up' | 'down';
  onRefresh: () => void;
  refreshing?: boolean;
  getHeight?: boolean;
}
const PREFIX = 'f-refresh';
const CustomizeDown = {
  activate: (
    <div className={`${PREFIX}-refresh`}>
      <ArrowUpOutlined />
      <span>松开立即刷新</span>
    </div>
  ),
  deactivate: (
    <div className={`${PREFIX}-refresh`}>
      <ArrowDownOutlined />
      <span>下拉刷新</span>
    </div>
  ),
  release: (
    <div className={`${PREFIX}-refresh`}>
      <LoadingOutlined />
      <span>正在刷新...</span>
    </div>
  ),
  finish: <div className={`${PREFIX}-refresh`}>刷新完成</div>,
};
const CustomizeUp = {
  activate: (
    <div className={`${PREFIX}-refresh`}>
      <ArrowDownOutlined />
      <span>立即加载</span>
    </div>
  ),
  deactivate: (
    <div className={`${PREFIX}-refresh`}>
      <ArrowUpOutlined />
      <span>上拉加载</span>
    </div>
  ),
  release: (
    <div className={`${PREFIX}-refresh`}>
      <LoadingOutlined />
      <span>正在加载...</span>
    </div>
  ),
  finish: <div className={`${PREFIX}-refresh`}>加载完成</div>,
};
const FPullToRefresh: FC<IFPullToRefresh> = ({
  children,
  refreshing,
  dirction,
  onRefresh,
  getHeight = false,
}) => {
  const [height, setHeight] = useState<number>();
  const ref = useRef(null);
  useEffect(() => {
    if (getHeight) {
      const node = ReactDOM.findDOMNode(ref.current);
      if (node) {
        const hei =
          document.documentElement.clientHeight -
          (node as HTMLDivElement).getBoundingClientRect().top;
        setHeight(hei);
      }
    }
  }, [getHeight]);
  return (
    <PullToRefresh
      className={PREFIX}
      damping={100}
      distanceToRefresh={60}
      ref={ref}
      style={
        getHeight
          ? {
              height: height,
              overflow: 'auto',
            }
          : undefined
      }
      indicator={dirction === 'down' ? CustomizeDown : CustomizeUp}
      direction={dirction}
      refreshing={refreshing}
      getScrollContainer={() => null}
      onRefresh={onRefresh}
    >
      {children}
    </PullToRefresh>
  );
};

export default FPullToRefresh;
