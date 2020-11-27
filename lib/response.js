import axios from 'axios'
import { isFunction } from './util';
import {
  clearQueen
} from './queen'

function responseInfoLog(response) {
  if (response.config.log && process.env.NODE_ENV === "development") {
    console.log('done... ' + response.config.url, {
      pagePath: location.href,
      requestUrl: response.config.url,
      timestamp: response.config.timestamp,
      time: new Date() - response.config.timestamp,
      status: response.status,
      data: response.data
    });
  }
}

export default function responseInterceptor(axiosInstance) {
  axiosInstance.interceptors.response.use(response => {
    const { validateBusiStatus } = response.config
    // 检测业务操作是否成功
    if (isFunction(validateBusiStatus)) {
      if (!validateBusiStatus(response)) {
        return Promise.reject(response)
      }
    }
    // 打印成功日志
    responseInfoLog(response)
    return Promise.resolve(response.data);
  }, error => {
    // 打印失败日志
    // ...
    if (!axios.isCancel(error)) {
      const { config, response } = error
      if (response) {
        const { status, data } = response
        if (status === 401) {
          // TODO 配置化
          // 清空所有正在请求队列
          clearQueen()
          // TODO 未登录提醒
          // ...
          // TODO 重定向到登录页
          // store.dispatch('logout')
          return Promise.reject(data.message || '登录失败')
        }
      }
      // 默认提示
      if (config && isFunction(config.showErrorMsg)) {
        config.showErrorMsg(error)
      }
    } else {
      // 接口被取消
    }
    Promise.reject(error)
  })
}
