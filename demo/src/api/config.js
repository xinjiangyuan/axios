import {
  create
} from 'request-by-axios'

const options = [{
    baseUrl: '/api/user',
    serverName: 'user',
    log: true
  },
  {
    baseUrl: '/api/order',
    serverName: 'order',
    log: true,
    adapter: config => {
      return new Promise((resolve) => {
        const res = {
          data: {
            success: true,
            message: 'Ok',
            data: [
              { id: 1 },
              { id: 2 }
            ]

          },
          status: 200,
          statusText: 'OK',
          config
        }
        // 调用响应函数
        setTimeout(() => {
          resolve(res)
        }, 5000)
      })
    }
  }
]
const instance = create(options)

export default instance
