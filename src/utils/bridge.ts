/* eslint-disable prefer-rest-params */
/* eslint-disable no-invalid-this */

/**
 * vaffleBackToNative 原生返回
 * vaffleNavigationBarChanged 导航栏状态切换
 * VaffleShareBridgeKey 原生分享 type, title, shareContent, picUrl, shareUrl
 * vaffleNavigationBarChange 原生状态栏隐藏  isHidden: true
 * examPassResultKey 原生考试入口页面刷新 "type": 0, 仲裁官考试1.监察员考试 "isSuccess":0: 失败， 1.通过
 * VaffleGroupDetailBridgeKey 用户群组详情  guid
 * vaffleMemberCenter/VaffleMemberCenterBridgeKey 个人中心  type  normal shop brand 1普通用户 2店铺 3品牌 member_uuid, business_id
 * VaffleEditProfileBridgeKey 编辑个人资料
 * VaffleQABridgeKey QA列表
 * VaffleSigninBridgeKey 签到
 * VaffleGotoStoreBridgeKey 前往新增店铺
 * vaffleSavedPhotosToAlbum 下载图片保存到相册 url
 */
type IBridgeKeys = 'nativeRouterPush';

interface ICallNativeHandlerProp {
  actionName: IBridgeKeys;
  actionArgs?: any[];
  successCallback?: (e: any) => void;
  failCallback?: (e: any) => void;
}
interface IZHBridgeProp {
  Core: {
    getAndClearJsActions: () => string;
    callJsHandler: (this: any, data: any) => string | undefined;
    callbackJs: (this: void) => string | undefined;
    callNativeHandler: (prop: ICallNativeHandlerProp) => void;
    registerJsHandler: (handlerName: string, callback: (e: any) => void) => void;
    ready: () => void;
  };
}
declare const window: Window & {
  androidObject: any;
  webkit: any;
  ZHBridge: IZHBridgeProp;
  zhbridge_messageHandlers: any;
};

const ZHBridge = window.ZHBridge || {};
window.ZHBridge = ZHBridge;

const browser = {
  versions: (function () {
    const u = window.navigator.userAgent;
    return {
      // IE鍐呮牳
      trident: u.indexOf('Trident') > -1,
      // opera鍐呮牳
      presto: u.indexOf('Presto') > -1,
      // 鑻规灉銆佽胺姝屽唴鏍�
      webKit: u.indexOf('AppleWebKit') > -1,
      // 鐏嫄鍐呮牳
      gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1,
      // 鏄惁涓虹Щ鍔ㄧ粓绔�
      mobile: !!u.match(/AppleWebKit.*Mobile.*/),
      // ios缁堢
      ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
      // android缁堢
      android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1,
      // 鏄惁涓篿Phone鎴栬€匭QHD娴忚鍣�
      iPhone: u.indexOf('iPhone') > -1,
      // 鏄惁iPad
      iPad: u.indexOf('iPad') > -1,
      // 鏄惁web搴旇绋嬪簭锛屾病鏈夊ご閮ㄤ笌搴曢儴
      webApp: u.indexOf('Safari') === -1,
      // 鏄惁寰俊 锛�2015-01-22鏂板锛�
      weixin: u.indexOf('MicroMessenger') > -1,
    };
  })(),
  language: ((navigator as any).browserLanguage || navigator.language).toLowerCase(),
};
ZHBridge.Core = (function () {
  const callbacks: any = {};
  let actionQueue: any = [];
  let callbackId = 1;
  const createBridge = function () {
    const iFrame = document.createElement('iframe');
    iFrame.setAttribute('src', 'ZHBridge://__BRIDGE_LOADED__');
    iFrame.setAttribute('style', 'display:none;');
    iFrame.setAttribute('height', '0px');
    iFrame.setAttribute('width', '0px');
    iFrame.setAttribute('frameborder', '0');
    document.body.appendChild(iFrame);
    setTimeout(function () {
      document.body.removeChild(iFrame);
    }, 0);
  };
  const callNativeHandler = function (prop: ICallNativeHandlerProp) {
    const { actionName, actionArgs = [], successCallback, failCallback } = prop;
    callbackId += 1;
    let actionId = callbackId;

    if (successCallback || failCallback) {
      callbacks[actionId] = { success: successCallback, fail: failCallback };
    } else {
      actionId = 0;
    }

    const action = {
      id: actionId,
      name: actionName,
      args: actionArgs,
      argsCount: actionArgs.length,
    };
    if (browser.versions.android) {
      if (actionArgs && actionArgs.length > 0) {
        window.androidObject &&
          window.androidObject[actionName] &&
          window.androidObject[actionName](JSON.stringify(actionArgs[0]));
      } else {
        window.androidObject &&
          window.androidObject[actionName] &&
          window.androidObject[actionName]();
      }
    } else if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.ZHBridge &&
      window.webkit.messageHandlers.ZHBridge.postMessage
    ) {
      window.webkit.messageHandlers.ZHBridge.postMessage(JSON.stringify([action]));
    } else if (
      window.zhbridge_messageHandlers &&
      window.zhbridge_messageHandlers.ZHBridge &&
      window.zhbridge_messageHandlers.ZHBridge.postMessage
    ) {
      window.zhbridge_messageHandlers.ZHBridge.postMessage(JSON.stringify([action]));
    } else {
      actionQueue.push(action);
      createBridge();
    }
  };
  const getAndClearQueuedActions = function () {
    const json = JSON.stringify(actionQueue);
    actionQueue = [];
    return json;
  };
  const callbackJs = function (this: void) {
    // eslint-disable-next-line prefer-rest-params
    const data = arguments[0];
    if (!data) {
      return;
    }
    const callInfo = data;
    const callbackId = callInfo.id;
    const status = callInfo.status;
    const args = callInfo.args;
    if (!callbackId || status === undefined || args === undefined) {
      return;
    }
    const callback = callbacks[callbackId];
    const success = callback.success;
    const fail = callback.fail;
    if (!callback) {
      return;
    }
    let result = '';
    if (status && success) {
      result = success.apply(this, args);
    } else if (!status && fail) {
      result = fail.apply(this, args);
    }
    return result !== undefined ? JSON.stringify(result) : undefined;
  };
  const handlerMapper: any = {};
  const callJsHandler = function (this: any, data: any) {
    const callInfo = data;
    const name = callInfo.name;
    const args = callInfo.args;
    const argsCount = callInfo.argsCount;
    if (!name || argsCount === undefined || argsCount !== args.length) {
      return;
    }
    const handler = handlerMapper[name];
    if (handler) {
      const result = handler.apply(this, args);
      return result !== undefined ? JSON.stringify(result) : undefined;
    }
  };
  const registerJsHandler = function (handlerName: string, callback: (e: any) => void) {
    handlerMapper[handlerName] = callback;
    if (browser.versions.android) {
      (window as any)[handlerName] = callback;
    }
  };
  const ready = function () {
    const readyFunction = arguments[0];
    if (readyFunction) {
      document.addEventListener('DOMContentLoaded', readyFunction);
    }
  };
  return {
    getAndClearJsActions: getAndClearQueuedActions,
    callJsHandler,
    callbackJs,
    callNativeHandler,
    registerJsHandler,
    ready,
  };
})();

export default ZHBridge;
