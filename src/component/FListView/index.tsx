import { ListView } from 'antd-mobile';
import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import { FListViewReducer } from './reducer';
import FPullToRefresh from '../FPullToRefresh';
import { LoadingOutlined } from '@ant-design/icons';
import HttpApi, { BaseHttpModel } from '@src/utils/https';
import _ from 'lodash';
import { IPageRes } from '@src/types/system';

interface IFListViewProps<T = any> {
  queryApi: ((data: any) => Promise<BaseHttpModel<IPageRes<T>>>) | string;
  row: (rowData: T, sectionID: any, rowID: any) => React.ReactElement;
  initialParam?: {
    [key: string]: any;
  };
}

const FListView = <T extends unknown>({
  queryApi,
  row,
  initialParam,
}: IFListViewProps<T>) => {
  const ref = useRef(null);
  const [state, dispatch] = useReducer(FListViewReducer, {
    dataSource: new ListView.DataSource({
      rowHasChanged: (row1: any, row2: any) => row1 !== row2,
    }),
    refreshing: true,
    isLoading: true,
    height: document.documentElement.clientHeight,
    hasMore: true,
  });
  const queryParams = useRef({
    page: 1,
    limit: 10,
  });
  const rData = useRef<Array<any>>([]);

  const query = () => {
    let promise: Promise<BaseHttpModel<IPageRes<T>>>;

    if (_.isFunction(queryApi)) {
      promise = queryApi({ ...queryParams.current, ...initialParam });
    } else {
      promise = HttpApi.request<IPageRes<T>>({
        url: queryApi as string,
        params: { ...queryParams.current, ...initialParam },
      });
    }
    promise
      .then((res) => {
        queryParams.current.page = res.data.page;
        rData.current = [...rData.current, ...res.data.list];
        dispatch({
          dataSource: state.dataSource.cloneWithRows(res.data.list),
          isLoading: false,
          refreshing: false,
        });
      })
      .catch((err) => {
        dispatch({ isLoading: false });
      });
  };

  useEffect(() => {
    query();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const hei =
      document.documentElement.clientHeight -
      (
        ReactDOM.findDOMNode(ref.current)! as HTMLDivElement
      ).getBoundingClientRect().top;
    dispatch({ height: hei });
  }, []);

  const onRefresh = () => {
    queryParams.current.page = 1;
    rData.current = [];
    dispatch({ refreshing: true, isLoading: true });
    query();
  };

  const onEndReached = (event: any) => {
    if (state.isLoading) {
      return;
    }
    dispatch({ isLoading: true });
    query();
  };

  return (
    <ListView
      ref={ref}
      dataSource={state.dataSource}
      // renderHeader={() => <span>Pull to refresh</span>}
      renderFooter={() => (
        <div style={{ textAlign: 'center' }}>
          {state.isLoading ? (
            <span>
              <LoadingOutlined />
              <span style={{ marginLeft: 5 }}>加载中...</span>
            </span>
          ) : (
            '没有更多了'
          )}
        </div>
      )}
      renderBodyComponent={() => <MyBody />}
      style={{
        height: state.height,
        background: 'transparent',
      }}
      renderRow={row}
      pullToRefresh={
        <FPullToRefresh
          dirction="down"
          refreshing={state.refreshing}
          onRefresh={onRefresh}
        />
      }
      onEndReached={onEndReached}
      onEndReachedThreshold={20}
      pageSize={10}
    />
  );
};
function MyBody(props: any) {
  return (
    <div className="am-list-body my-body">
      <span style={{ display: 'none' }}>you can custom body wrap element</span>
      {props.children}
    </div>
  );
}
export default FListView;
