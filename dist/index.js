import axios from 'axios';
import defaultOption from './option';
import requestInterceptor from './request';
import responseInterceptor from './response';
import { guid } from './util';
import { deleteByUUID, clearQueen } from './queen';

function createInstance(option) {
  var axiosInstance = axios.create(option);
  requestInterceptor(axiosInstance);
  responseInterceptor(axiosInstance); // .match(/\d+$/g)

  return axiosInstance;
}

function create(options) {
  // 没有传参，取默认参数
  var listOptions = [].concat(options || defaultOption);
  listOptions.forEach(function (option) {
    var axiosInstance = createInstance(Object.assign(defaultOption, option));
    instance[option.serverName] = axiosInstance;
  });
  var orginRequest = axios.Axios.prototype.request;

  axios.Axios.prototype.request = function (config) {
    config.uuid = guid();
    return orginRequest.call(this, config).finally(function () {
      deleteByUUID(config.uuid);
    });
  };

  return instance;
}

export { create, clearQueen };
var instance = {
  axios: axios
};
export default instance;