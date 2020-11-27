import { isEqualObj } from './util';
var REQUEST_QUEEN = {};

function isEqualXhr(a, b, m) {
  // 宽松校验
  if (m > 3) {
    return a.url === b.url;
  }

  return isEqualObj(a, b);
}

function addByConfig(_ref) {
  var cancel = _ref.cancel,
      uuid = _ref.uuid,
      url = _ref.url,
      data = _ref.data,
      parms = _ref.parms,
      method = _ref.method;
  REQUEST_QUEEN[uuid] = {
    uuid: uuid,
    cancel: cancel,
    url: url,
    data: data,
    parms: parms,
    method: method
  };
}

function deleteByUUID(uuid) {
  delete REQUEST_QUEEN[uuid];
}

function cancelByConfig(_ref2, cancel) {
  var url = _ref2.url,
      cancelModel = _ref2.cancelModel,
      data = _ref2.data,
      params = _ref2.params;
  var urls = Object.values(REQUEST_QUEEN);

  if (!urls.length) {
    return;
  }

  var equals = urls.filter(function (item) {
    return isEqualXhr({
      url: item.url,
      data: item.data,
      params: item.params
    }, {
      url: url,
      data: data,
      params: params
    }, cancelModel);
  });

  if (!equals.length) {
    return;
  } // 中断历史请求


  if (cancelModel % 2 === 1) {
    equals.forEach(function (item) {
      return item.cancel();
    });
  } else {
    // TODO 验证调用cancelToken是否回抛出异常，阻止后续执行
    cancel();
  }
}

function clearQueen() {
  REQUEST_QUEEN = {};
}

export { addByConfig, deleteByUUID, cancelByConfig, clearQueen };