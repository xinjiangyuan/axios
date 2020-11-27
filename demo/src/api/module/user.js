import http from 'request-by-axios'
const { user } = http

export default {
  login: function (data, config) {
    return user.post('login', data, config)
  }
}
