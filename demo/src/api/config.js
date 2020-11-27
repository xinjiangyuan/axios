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
      // let find = mockRouter.find(config.url)
      // if (!find) {
        // 改使用默认的adapter
        // delete config.adapter
        // return Axios(config)
      // }
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
