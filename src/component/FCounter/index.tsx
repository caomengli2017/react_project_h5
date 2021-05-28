import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useCounter } from 'ahooks';
import classNames from 'classnames';
import { useEffect } from 'react';
import './index.less';
/**
 *
 * @author Leo
 * @desc 计数器
 * @date 2021-05-19 10:34:35
 */
interface IFCounterProps {
  value?: number;
  onChange?: (e: number) => void;
  max?: number;
  min?: number;
  disable?: boolean;
}
const PREFIX = 'f-counter';
const FCounter = ({
  value,
  onChange,
  max = 100,
  min = 0,
  disable,
}: IFCounterProps) => {
  const [current, { inc, dec, set }] = useCounter(0, {
    min: min,
    max: max,
  });
  useEffect(() => {
    if (value) set(value);
  }, [value, set]);
  return (
    <div className={PREFIX}>
      <span
        className={classNames('btn', { disable: current === min || disable })}
        onClick={() => {
          if (!disable && current > min) {
            dec();
            onChange && onChange(current - 1);
          }
        }}
      >
        <MinusOutlined />
      </span>
      <span className="content">{current}</span>
      <span
        className={classNames('btn', { disable: current === max || disable })}
        onClick={() => {
          if (!disable && current < max) {
            inc();
            onChange && onChange(current + 1);
          }
        }}
      >
        <PlusOutlined />
      </span>
    </div>
  );
};

export default FCounter;
