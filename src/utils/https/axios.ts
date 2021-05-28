import { Toast } from 'antd-mobile';
import Axios from 'axios';
import store from '@src/redux/store';

const axios = Axios.create();

axios.interceptors.request.use((value) => {
  const {
    // login,
    accessToken = '21c844e5266b23a779e2e41dacaac5e2',
    uuid = 'fb33878a-4bed-4cd3-99dd-82987a2820df',
  } = store.getState().user;

  value.headers['lang'] = 'cn';
  // if (login) {
  value.headers = {
    ...value.headers,
    device: 'web',
    accessToken,
    uuid,
  };
  // }

  return value;
});

axios.interceptors.response.use(
  (res) => {
    if (res.status === 200) {
      return Promise.resolve(res);
    } else {
      openErrorNotification(res.statusText, 'Network Error');
      return Promise.reject(res);
    }
  },
  (error) => {
    openErrorNotification(error.toString(), 'Network Error');
    return Promise.reject(error);
  }
);
const openErrorNotification = (text: string, msg: string = 'Error') => {
  Toast.info(text);
  // notification.error({
  //   message: msg,
  //   description: text,
  // });
};
export default axios;
