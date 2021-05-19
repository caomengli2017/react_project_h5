import { Button, Carousel } from 'antd-mobile';
import React, { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useCounter } from 'ahooks';
import './index.less';
import {
  MinusOutlined,
  PlusOutlined,
  CloseCircleFilled,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import classNames from 'classnames';
import { useHistory } from 'react-router';
import { getGoodsDetails } from '@src/apis/purchase';
import { GoodsImage, IGoodsDetailsModal } from '../../../types/model/purchase';

const PREFIX = 'f-purchase-details';

const PurchaseDetailsPage = () => {
  const history = useHistory();
  const [data, setdata] = useState<IGoodsDetailsModal>();
  useEffect(() => {
    getGoodsDetails(1).then((res) => {
      setdata(res.data);
    });
  }, []);
  return (
    <div className={PREFIX}>
      <div className={`${PREFIX}-close`} onClick={() => history.goBack()}>
        <CloseCircleFilled />
      </div>
      <CarouselView imgUrl={data?.images} />
      <div className={`${PREFIX}-name`}>
        <h2>{data?.name}</h2>
        <p>
          <span>
            {data?.price.sign} {data?.price.value}
          </span>
        </p>
      </div>
      <SpecView />
      <div className={`${PREFIX}-details`}>
        <h3>商品详情</h3>
        <LazyLoadImage
          width="100%"
          src={
            'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F1812.img.pp.sohu.com.cn%2Fimages%2Fblog%2F2009%2F11%2F18%2F18%2F8%2F125b6560a6ag214.jpg&refer=http%3A%2F%2F1812.img.pp.sohu.com.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623920700&t=4ac4633b972908108ec4fd50c6f35eef'
          }
        />
      </div>
      <div className={`${PREFIX}-btns`}>
        <div className={`${PREFIX}-btns-shop`}>
          <ShoppingCartOutlined style={{ fontSize: 25 }} />
        </div>
        <Button type="primary">加入购物车</Button>
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
              <LazyLoadImage
                placeholderSrc={'https://via.placeholder.com/375'}
                src={val.image}
              />
            </div>
          ))}
        </Carousel>
      )}
      {imgUrl && (
        <div className={`${PREFIX}-pagination`}>
          {current}/{imgUrl?.length}
        </div>
      )}
    </div>
  );
};
type ISpecViewProps = {
  // specList:
};
const SpecView = ({}: ISpecViewProps) => {
  const [current, { inc, dec, set, reset }] = useCounter(0, {
    min: 0,
    max: 100,
  });
  return (
    <div className={`${PREFIX}-spec`}>
      <div className={`${PREFIX}-spec-header`}>
        <span>规格/单价</span>
        <span>数量</span>
      </div>
      <div className={`${PREFIX}-spec-box`}>
        <div className={`${PREFIX}-spec-box-left`}>
          <LazyLoadImage
            width={'100%'}
            placeholderSrc={'https://via.placeholder.com/56'}
            src={`https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fup.enterdesk.com%2Fedpic%2F4c%2Fa6%2F31%2F4ca631a8841304be2351295d50cf801d.jpg&refer=http%3A%2F%2Fup.enterdesk.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1623915119&t=a1ac634fb7cbb3eddc13451d2000f4ec`}
          />
        </div>
        <div className={`${PREFIX}-spec-box-center`}>
          <div>xxxxxx</div>
          <div>xxxxxx</div>
          <div>
            <span>$ 220.0</span>
          </div>
        </div>
        <div className={`${PREFIX}-spec-box-right`}>
          <div>
            <span
              className={classNames('btn', { disable: current === 0 })}
              onClick={() => dec()}
            >
              <MinusOutlined />
            </span>
            <span className="content">{current}</span>
            <span
              className={classNames('btn', { disable: current === 100 })}
              onClick={() => inc()}
            >
              <PlusOutlined />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PurchaseDetailsPage;
