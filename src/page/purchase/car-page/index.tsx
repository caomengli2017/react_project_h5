import React, { memo, useEffect, useMemo, useState } from 'react';
import { HomeOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Checkbox, Icon, Modal, NavBar, Toast } from 'antd-mobile';
import { useHistory } from 'react-router-dom';
import './index.less';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FCheckbox, FSpecItem } from '@src/component';
import _ from 'lodash';
import {
  deleteCart,
  deleteCartAll,
  getCartList,
  updateChecked,
  updateNum,
} from '@src/apis/purchase';
import { AvailableItem, ICartListModal } from '@src/types/model/purchase';

const PREFIX = 'f-shopping-cart';
const ShoppingCartPage = () => {
  const history = useHistory();
  const [select, setSelect] = useState<(number | string)[][]>([]);
  const [data, setData] = useState<ICartListModal>();
  useEffect(() => {
    Toast.loading('Loading...', 10);
    getCartList()
      .then((res) => {
        setData(res.data);
        const _list = res.data.items.availableItems.map((item) => {
          const ids: (number | string)[] = [];
          item.products.forEach((e) => {
            if (e.checked) ids.push(e.identifier);
          });
          return ids;
        });
        setSelect(_list);
      })
      .finally(() => Toast.hide());
  }, []);
  const invalidTitle = useMemo(
    () => (
      <div className={`${PREFIX}-body-title`}>
        <span>已失效的货品</span>
        <span
          onClick={() => {
            const ids = data?.items.unavailableItems.map((item) => {
              const ids: string[] = [];
              item.products.forEach((e) => {
                ids.push(e.identifier);
              });
              return ids;
            });

            deleteCart({ identifiers: _.flattenDeep(ids) }).then((res) => {
              setData(res.data);
            });
          }}
        >
          清除所有失效的货品
          <DeleteOutlined key={'2'} style={{ fontSize: 20 }} />
        </span>
      </div>
    ),
    [data]
  );
  const list = useMemo(() => {
    return (
      data?.items.availableItems.map((item) => {
        return item.products.map((e) => e.identifier);
      }) ?? []
    );
  }, [data]);
  return (
    <div className={PREFIX}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        rightContent={[
          <HomeOutlined key={'1'} style={{ fontSize: 20, marginRight: 15 }} />,
          <DeleteOutlined
            key={'2'}
            style={{ fontSize: 20 }}
            onClick={() => {
              Modal.alert('清空购物车', '您确定要清空购物车的所有商品吗？', [
                { text: '取消', onPress: () => console.log('cancel') },
                {
                  text: '确定',
                  onPress: () => {
                    deleteCartAll().then((res) => {
                      setData(res.data);
                    });
                  },
                },
              ]);
            }}
          />,
        ]}
      >
        购物车
      </NavBar>
      <div className={`${PREFIX}-body`}>
        {data?.items.availableItems.map((item, index) => (
          <GoodsView
            key={index}
            data={item}
            value={select[index]}
            onDelete={(id) => {
              deleteCart({ identifiers: [id] }).then((res) => {
                setData(res.data);
              });
            }}
            onChange={(e: number[]) => {
              select[index] = e.sort();
              updateChecked({
                checkedIdentifiers: _.flattenDeep(select),
              }).then((res) => {
                setData(res.data);
              });
              setSelect([...select]);
            }}
            onAddNum={(e) => {
              updateNum({
                items: [{ identifier: e.id, quantity: e.num }],
              }).then((res) => {
                setData(res.data);
              });
            }}
          />
        ))}
        {/*  失效 */}
        {data && data.items.unavailableItems.length > 0 && invalidTitle}
        {data?.items.unavailableItems.map((item, index) => (
          <GoodsView
            key={index}
            data={item}
            value={select[index]}
            disabled={true}
            onDelete={(id) => {
              deleteCart({ identifiers: [id] }).then((res) => {
                setData(res.data);
              });
            }}
          />
        ))}
        {data && data.total.countTotal === 0 && (
          <div className={`${PREFIX}-empty`}>
            <img src={require('../../../assets/img/empty.svg')} alt="empty" />
          </div>
        )}
      </div>
      {data && data.total.countTotal > 0 && (
        <footer className={`${PREFIX}-footer`}>
          <div>
            <Checkbox
              checked={
                _.flattenDeep(select).length === _.flattenDeep(list).length
              }
              onChange={(e) => {
                if (e.target.checked) {
                  setSelect(_.cloneDeep(list));
                } else {
                  setSelect([]);
                }
              }}
            >
              <span style={{ marginLeft: 10 }}>全选</span>
            </Checkbox>
          </div>
          <div>
            <p>
              合计：
              <span>
                {data?.total.goodsFee.sign} {data?.total.goodsFee.value}
              </span>
            </p>
            <p>{data?.total.selectedCountTotal}件货品，不含运费</p>
          </div>
          <div>
            <Button type="primary" onClick={() => history.push(`/order-page`)}>
              结算
            </Button>
          </div>
        </footer>
      )}
    </div>
  );
};
type IValues = { id: number | string; num: number };
type IGoodsViewProps = {
  data?: AvailableItem;
  value?: Array<number | string>;
  onChange?(e: Array<number | string>): void;
  disabled?: boolean;
  onDelete(id: number | string): void;
  onAddNum?(e: IValues): void;
};
const GoodsView = memo(
  ({
    data,
    value = [],
    onChange,
    disabled,
    onDelete,
    onAddNum,
  }: IGoodsViewProps) => {
    const list = useMemo(() => {
      return data?.products.map((e) => e.id) ?? [];
    }, [data]);
    return (
      <div className={`${PREFIX}-goods`}>
        <FCheckbox
          disabled={disabled}
          checked={data?.products.length === value?.length}
          onChange={(e) => {
            if (e) {
              onChange && onChange([...list]);
            } else {
              onChange && onChange([]);
            }
          }}
        >
          <div className={`${PREFIX}-goods-header`}>
            <div className={`${PREFIX}-goods-header-img`}>
              <LazyLoadImage
                width="100%"
                height="100%"
                placeholderSrc={'https://via.placeholder.com/56'}
                src={data?.image}
              />
            </div>
            <div className={`${PREFIX}-goods-header-main`}>
              <h3>{data?.name}</h3>
            </div>
          </div>
        </FCheckbox>
        {data?.products.map((item, index) => {
          const _data = {
            id: item.identifier || 0,
            bn: item.bn,
            price: item.discountedPrice,
            specs: item.specs,
            quantity: item.quantity,
          };
          return (
            <FCheckbox
              disabled={disabled}
              key={index}
              divider={true}
              checked={value?.includes(item.identifier)}
              onChange={(e) => {
                if (!e) {
                  const index = value?.indexOf(item.identifier);
                  if (index !== -1) {
                    value?.splice(index, 1);
                    onChange && onChange(value!);
                  }
                } else {
                  value?.push(item.identifier);
                  onChange && onChange(value!);
                }
              }}
              onDelete={() => onDelete(item.identifier)}
            >
              <FSpecItem
                data={_data}
                disabled={disabled}
                onChange={(e) => {
                  onAddNum && onAddNum(e);
                }}
              />
            </FCheckbox>
          );
        })}
      </div>
    );
  }
);
export default ShoppingCartPage;
