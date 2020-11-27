import './config'
import user from './module/user'
import order from './module/order'

const apiList = Object.assign({}, user, order)

function install(Vue) {
  if (install.installed) {
    return console.warn('api重复注册')
  }
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiList
      }
    }
  })
  install.installed = true
}

export default {
  install
}
