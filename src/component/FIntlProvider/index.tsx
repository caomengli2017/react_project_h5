import React, { useEffect, useMemo, useState, FC } from 'react';
import intl from 'react-intl-universal';

import zhCN from '@src/utils/locales/zh-CN';
import './index.less';

interface IFIntlProviderProps {}
const FIntlProvider: FC<IFIntlProviderProps> = ({ children }) => {
  const [initDone, setInitDone] = useState(false);
  useEffect(() => {
    // 多语言设置 可优化 将翻译文件放入静态服务器 请求获取 减少打包体积
    intl
      .init({
        currentLocale: 'zh-CN',
        locales: {
          'zh-CN': zhCN,
        },
      })
      .then(() => {
        setInitDone(true);
      });
  }, []);
  const suspenseSpin = useMemo(() => {
    return <div className="f-intl-spin"></div>;
  }, []);
  if (initDone === false) return <React.Fragment>{suspenseSpin}</React.Fragment>;
  return <React.Fragment>{children}</React.Fragment>;
};

export default FIntlProvider;
