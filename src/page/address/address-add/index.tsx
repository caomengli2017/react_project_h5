import { DeleteOutlined, PhoneOutlined } from '@ant-design/icons';
import citiesOption from '@src/utils/cities';
import {
  Button,
  Icon,
  InputItem,
  List,
  Modal,
  NavBar,
  Picker,
  Switch,
} from 'antd-mobile';
import React from 'react';
import { useHistory } from 'react-router-dom';
import './index.less';

const PREFIX = 'f-address-add-page';
const AddressAddPage = () => {
  const history = useHistory();
  return (
    <div className={PREFIX}>
      <NavBar
        mode="light"
        icon={<Icon type="left" />}
        onLeftClick={() => history.goBack()}
        rightContent={[
          <DeleteOutlined
            style={{ fontSize: 20 }}
            onClick={() => {
              Modal.alert('删除地址', '您确定要删除此地址么？', [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () => console.log('ok') },
              ]);
            }}
          />,
        ]}
      >
        新添收货地址
      </NavBar>
      <div className={`${PREFIX}-body`}>
        <div className={`${PREFIX}-box`}>
          <List>
            <InputItem clear placeholder="请填写收件人姓名">
              收件人
            </InputItem>
            <InputItem
              clear
              placeholder="请填写收件人手机号"
              extra={<PhoneOutlined />}
            >
              手机号码
            </InputItem>
            <Picker
              title="选择地区"
              extra="请选择地址"
              data={citiesOption}
              // value={this.state.pickerValue}
            >
              <List.Item arrow="horizontal">所在地区</List.Item>
            </Picker>
            <InputItem clear placeholder="请填写详细地址">
              详细地址
            </InputItem>
            <List.Item extra={<Switch />}>设为默认地址</List.Item>
          </List>
        </div>
      </div>
      <footer className={`${PREFIX}-footer`}>
        <div>
          <Button style={{ backgroundColor: '#111' }} type="primary">
            保存
          </Button>
        </div>
      </footer>
    </div>
  );
};

export default AddressAddPage;
