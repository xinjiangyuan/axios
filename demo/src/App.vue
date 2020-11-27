<template>
  <div>
    <div>
      自定义adapter
      <button @click="sendOrder">发起order请求</button>
    </div>
    <div>
      不同模块不同配置
      <button @click="sendUser">发起user请求</button>
      <button @click="sendOrder">发起order请求</button>
    </div>
    <div>
      防重入
      <button @click="sendOrder2">连续发起两次order请求</button>
    </div>
    <div>
      自定义错误提醒
      <button @click="sendUser2">调用接口传入或全局配置， 进行500系列提醒</button>
    </div>
    <div>
      参数去空格
      <button @click="sendUser3">参数去空格</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Axios',
  methods: {
    sendUser() {
      this.$api.login()
    },
    sendOrder() {
      this.$api.list()
    },
    sendOrder2() {
      this.sendOrder()
      setTimeout(this.sendOrder, 2000)
    },
    sendUser2() {
      this.$api.login(
        { username: '', password: '' },
        {
          showErrorMsg: ({ response }) => {
            if (response.status === 404) {
              alert('接口未实现')
            }
          }
        }
      )
    },
    sendUser3() {
      const data = { username: ' das f ', password: 'zzzz ' }
      this.$api.login(data, {
        beforeAxiosSend: function (config) {
          alert(
            '原数据:' + JSON.stringify(data) + '\n' + ' 处理后数据:' + JSON.stringify(config.data)
          )
        },
        autoTrim: true
      })
    }
  }
}
</script>

<style>
</style>
