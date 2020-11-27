export default {
  baseUrl: '',
  timeout: 1000,
  headers: {},
  maxContentLength: -1,
  maxBodyLength: -1,
  // transformResponse,
  // transformRequest,
  // adapter,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  },
  // 👆axios支持配置的属性
  // ================
  // 👇自定义传入的参数
  serverName: 'default',
  // axios实例的引用名
  autoTrim: false,
  log: false,
  cancelModel: 0,
  // 0 关闭 1 严格校验后中断前 2 严格校验后中断后 3 宽松校验中断前 4 宽松校验中断后
  // btnLoadingRef: null, // 未实装
  // modalLoadingRef: null, // 未实装
  validateBusiStatus: function validateBusiStatus(_ref) {
    var data = _ref.data;
    // return data.success
    return true;
  },
  showErrorMsg: function showErrorMsg(_ref2) {
    var config = _ref2.config,
        response = _ref2.response;
    // if (response.status >= 500 && response.status < 600) {
    // 服务器错误
    // }
    // if ...
    // 业务错误
    console.log('showErrorMsg -> 请求出错了');
  },
  onHeaderCreated: function onHeaderCreated(_ref3) {// const token = localStorage.getItem('token')
    // if (token) {
    //   header.token = token
    // }

    var header = _ref3.header;
  },
  beforeAxiosSend: function beforeAxiosSend(_ref4) {
    var header = _ref4.header;
  }
};