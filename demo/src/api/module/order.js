import http from 'request-by-axios'
const { order } = http

export default {
  list: function (params) {
    return order.get('url', {
      params,
      cancelModel: 2
    })
  }
}
