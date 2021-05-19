import { Toast } from 'antd-mobile';
import Axios from 'axios';
import store from '@src/redux/store';

const axios = Axios.create();

axios.interceptors.request.use((value) => {
  const {
    // login,
    accessToken = '12b2850042302c36cefe2bde35b817e1',
    uuid = 'f9505ff0-cb82-4f43-843f-a3389ca7308b',
  } = store.getState().user;

  value.headers['lang'] = 'cn';
  // if (login) {
  value.headers = {
    ...value.headers,
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
