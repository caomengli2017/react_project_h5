import _ from 'lodash';

export type IListViewState<T = any> = {
  dataSource: T;
  refreshing: boolean;
  isLoading: boolean;
  height: number;
  hasMore: boolean;
};
export type IListViewAction = ((e: IListViewState) => IListViewState) | Partial<IListViewState>;
export const FListViewReducer = (state: IListViewState, action: IListViewAction) => {
  if (_.isFunction(action)) {
    return { ...state, ...action(state) };
  }
  if (_.isObject(action)) {
    return { ...state, ...action };
  }
  return state;
};
