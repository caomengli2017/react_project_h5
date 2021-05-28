import { IProduct, ISpec } from '@src/types/model/purchase';
import classNames from 'classnames';
import React, { memo, ReactNode, useCallback } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { FCounter } from '..';
import './index.less';

const PREFIX = 'f-spec-item';
interface IFSpecItemProps {
  disabled?: boolean;
  rightNode?: (e?: any) => ReactNode;
  data: IProduct;
  onChange?(e: { id: number | string; num: number }): void;
}
const FSpecItem = memo(({ disabled, rightNode, data, onChange }: IFSpecItemProps) => {
  const spec = useCallback((val: ISpec[]) => {
    return val.map((e) => `${e.v}/${e.k}`).join(' ');
  }, []);
  return (
    <div className={PREFIX}>
      {data.image && (
        <div className={`${PREFIX}-left`}>
          <LazyLoadImage
            width={'100%'}
            height={'100%'}
            placeholderSrc={'https://via.placeholder.com/56'}
            src={data.image}
          />
        </div>
      )}
      <div className={`${PREFIX}-center`}>
        <div className={classNames({ disabled: disabled })}>{spec(data.specs)}</div>
        <div className={classNames({ disabled: disabled })}>SKU {data.bn}</div>
        <div>
          <span className={classNames({ disabled: disabled })}>
            {data.price.sign} {data.price.value}
          </span>
        </div>
      </div>
      <div className={`${PREFIX}-right`}>
        {rightNode ? (
          rightNode()
        ) : (
          <FCounter
            disable={disabled}
            value={data.quantity}
            onChange={(num) => {
              onChange && onChange({ id: data.id, num });
            }}
          />
        )}
      </div>
    </div>
  );
});

export default FSpecItem;
