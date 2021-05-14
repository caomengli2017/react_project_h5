import { Toast } from 'antd-mobile';
import Axios from 'axios';

const axios = Axios.create();

axios.interceptors.request.use((value) => {
  value.headers = {
    device: 'web',
  };
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
