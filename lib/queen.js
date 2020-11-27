import {
  isEqualObj
} from './util'

let REQUEST_QUEEN = {}

function isEqualXhr(a, b, m) {
  // 宽松校验
  if (m > 3) {
    return a.url === b.url
  }
  return isEqualObj(a, b)
}

function addByConfig({
  cancel,
  uuid,
  url,
  data,
  parms,
  method,
}) {
  REQUEST_QUEEN[uuid] = {
    uuid,
    cancel,
    url,
    data,
    parms,
    method
  }
}

function deleteByUUID(uuid) {
  delete REQUEST_QUEEN[uuid]
}

function cancelByConfig({
  url,
  cancelModel,
  data,
  params
}, cancel) {
  const urls = Object.values(REQUEST_QUEEN)
  if (!urls.length) {
    return
  }
  const equals = urls.filter(item => isEqualXhr({
    url: item.url,
    data: item.data,
    params: item.params
  }, {
    url,
    data,
    params
  }, cancelModel))
  if (!equals.length) {
    return
  }
  // 中断历史请求
  if (cancelModel % 2 === 1) {
    equals.forEach(item => item.cancel())
  } else {
    // TODO 验证调用cancelToken是否回抛出异常，阻止后续执行
    cancel()
  }
}

function clearQueen() {
  REQUEST_QUEEN = {}
}

export {
  addByConfig,
  deleteByUUID,
  cancelByConfig,
  clearQueen
}
