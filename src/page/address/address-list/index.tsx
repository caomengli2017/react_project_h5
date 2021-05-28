// import { EditOutlined } from '@ant-design/icons';
import { getAddressList } from '@src/apis/address';
import { FListView } from '@src/component';
import { IAddressListModal } from '@src/types/model';
import { Button, Icon, NavBar } from 'antd-mobile';
import React from 'react';
import { useHistory } from 'react-router';
import './index.less';
import { useDispatch } from 'react-redux';
import { setAddressAction } from '@src/redux/actions/purchase';

const PREFIX = 'f-address-list-page';
const AddressListPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <div className={PREFIX}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
      >
        收货地址
      </NavBar>
      <div className={`${PREFIX}-body`}>
        <FListView<IAddressListModal>
          queryApi={getAddressList}
          row={(data, sectionId, rowId) => (
            <div
              className={`${PREFIX}-address`}
              onClick={() => {
                dispatch(setAddressAction(data));
                history.goBack();
              }}
            >
              <span className={`${PREFIX}-address-dec`}>{data.storeName}</span>
              <div className={`${PREFIX}-address-body`}>
                <div className={`${PREFIX}-address-body-main`}>
                  <p>{data.address}</p>
                  {/* 请填写收货地址 */}
                  <p>{data.addressDetail}</p>
                  <p>
                    <span>{data.name}</span> <span>{data.tel}</span>
                  </p>
                </div>
                {/* <div className={`${PREFIX}-address-body-arrow`}>
                  <EditOutlined />
                </div> */}
              </div>
            </div>
          )}
        />
      </div>
      <footer className={`${PREFIX}-footer`}>
        <div>
          <Button
            style={{ backgroundColor: '#111' }}
            type="primary"
            onClick={() => history.push('/address-add-page')}
          >
            新增收货地址
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default AddressListPage;
