import { Checkbox, SwipeAction } from 'antd-mobile';
import { OnChangeParams } from 'antd-mobile/lib/checkbox/PropsType';
import classNames from 'classnames';
import React, { FC } from 'react';
import './index.less';

const PREFIX = 'f-checkbox';
interface IFCheckboxProps {
  checked?: boolean;
  onChange?(e: boolean): void;
  divider?: boolean;
  disabled?: boolean;
  onDelete?(): void;
}
const FCheckbox: FC<IFCheckboxProps> = ({
  children,
  checked,
  onChange,
  divider = false,
  disabled,
  onDelete,
}) => {
  const handleChange = (e: OnChangeParams) => {
    onChange && onChange(e.target.checked);
  };
  return (
    <div className={classNames(PREFIX, { divider: divider })}>
      <SwipeAction
        // style={{ backgroundColor: 'blue' }}
        autoClose
        right={[
          {
            text: '删除',
            onPress: onDelete,
            style: { backgroundColor: '#FF5000', color: 'white' },
          },
        ]}
      >
        <div className={`${PREFIX}-main`}>
          <div className={`${PREFIX}-main-left`}>
            {!disabled && <Checkbox checked={checked} onChange={handleChange} />}
          </div>
          <div className={`${PREFIX}-main-right`}>{children}</div>
        </div>
      </SwipeAction>
    </div>
  );
};

export default FCheckbox;
