import { Badge, Button, Carousel, Icon, NavBar, Toast } from 'antd-mobile';
import React, { useEffect, useRef, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './index.less';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useHistory, useParams } from 'react-router';
import { addCart, getGoodsDetails } from '@src/apis/purchase';
import { GoodsImage, IGoodsDetailsModal, IProduct } from '@src/types/model/purchase';
import { FSpecItem } from '@src/component';
import { useSelector, useDispatch } from 'react-redux';
import { IRootState } from '@src/redux/reducers';
import { setShoppingCartAction } from '@src/redux/actions/purchase';
/**
 *
 * @author Leo
 * @desc 采购商品详情
 * @date 2021-05-19 10:12:53
 */
const PREFIX = 'f-purchase-details';

type IParams = { id: string };
const PurchaseDetailsPage = () => {
  const history = useHistory();
  const [data, setdata] = useState<IGoodsDetailsModal>();
  const params = useParams<IParams>();
  const specNum = useRef<ISpecNum[]>();
  const { shoppingCart } = useSelector((state: IRootState) => state.purchase);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    getGoodsDetails(Number(params.id)).then((res) => {
      setdata(res.data);
    });
  }, [params]);
  const handleAddCar = () => {
    if (specNum.current === undefined) {
      return Toast.info('请选择商品');
    }
    setloading(true);
    addCart({ items: specNum.current })
      .then((res) => {
        dispatch(setShoppingCartAction(res.data.countTotal));
      })
      .finally(() => setloading(false));
  };
  return (
    <div className={PREFIX}>
      <NavBar mode="light" icon={<Icon type="left" />} onLeftClick={() => history.goBack()}>
        商品详情
      </NavBar>
      <div className={`${PREFIX}-body`}>
        <CarouselView imgUrl={data?.images} />
        <div className={`${PREFIX}-name`}>
          <h2>{data?.name}</h2>
          <p>
            <span>
              {data?.price.sign} {data?.price.value}
            </span>
          </p>
        </div>
        <SpecView products={data?.products} onChange={(e) => (specNum.current = e)} />
        {data?.desc && (
          <div className={`${PREFIX}-details`}>
            <h3>商品详情</h3>
            <div dangerouslySetInnerHTML={{ __html: data?.desc }}></div>
          </div>
        )}
      </div>

      <div className={`${PREFIX}-btns`}>
        <div className={`${PREFIX}-btns-shop`} onClick={() => history.push('/car-page')}>
          <Badge hot text={shoppingCart}>
            <ShoppingCartOutlined style={{ fontSize: 25 }} />
          </Badge>
        </div>
        <Button type="primary" onClick={handleAddCar} loading={loading}>
          加入购物车
        </Button>
      </div>
    </div>
  );
};
type ICarouselViewProps = {
  imgUrl?: GoodsImage[];
};
const CarouselView = ({ imgUrl }: ICarouselViewProps) => {
  const [current, setCurrent] = useState(1);
  return (
    <div className={`${PREFIX}-carousel`}>
      {!imgUrl && <img src="https://via.placeholder.com/375" alt="err" />}
      {imgUrl && (
        <Carousel
          autoplay={false}
          infinite
          dots={false}
          afterChange={(index) => setCurrent(index + 1)}
        >
          {imgUrl?.map((val, index) => (
            <div key={index} className={`${PREFIX}-carousel-box`}>
              <LazyLoadImage placeholderSrc={'https://via.placeholder.com/375'} src={val.image} />
            </div>
          ))}
        </Carousel>
      )}
      {imgUrl && imgUrl.length > 0 && (
        <div className={`${PREFIX}-pagination`}>
          {current}/{imgUrl?.length}
        </div>
      )}
    </div>
  );
};
type ISpecNum = { productId: number; quantity: number };
type ISpecViewProps = {
  products?: IProduct[];
  onChange: (e: ISpecNum[]) => void;
};
const SpecView = ({ products, onChange }: ISpecViewProps) => {
  const value = useRef<Array<ISpecNum>>([]);
  return (
    <div className={`${PREFIX}-spec`}>
      <div className={`${PREFIX}-spec-header`}>
        <span>规格/单价</span>
        <span>数量</span>
      </div>
      {products?.map((e) => (
        <FSpecItem
          key={e.id}
          data={e}
          onChange={(item) => {
            const val = value.current?.find((v) => v.productId === item.id);
            if (val) {
              val.quantity = item.num;
            } else {
              value.current?.push({
                productId: item.id as number,
                quantity: item.num,
              });
            }
            onChange(value.current);
          }}
        />
      ))}
    </div>
  );
};
export default PurchaseDetailsPage;
