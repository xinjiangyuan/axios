# 初步封装 axios

## 封装思路

- 支持多模块多 baseUrl 配置，每个实例可以单独配置
- 防重入策略
- 参数处理策略
- 校验业务状态是否为失败状态
- 失败状态进行全局提醒
- 提供一个方法取消当前正在进行的请求
- 消息国际化   ✖未实装

## 安装

安装 request-by-axios

```bash
npm install request-by-axios --save
#or
yarn add request-by-axios --dev
```

# 配置axios的实例

```javascript
import { create } from "request-by-axios";

const options = [
  {
    baseUrl: "/api/user",
    serverName: "user",
    log: true,
  },
  {
    baseUrl: "/api/order",
    serverName: "order",
    log: true,
    adapter: (config) => {
      return new Promise((resolve) => {
        const res = {
          data: {
            success: true,
            message: "Ok",
            data: [{ id: 1 }, { id: 2 }],
          },
          status: 200,
          statusText: "OK",
          config,
        };
        // 调用响应函数
        setTimeout(() => {
          resolve(res);
        }, 5000);
      });
    },
  },
];
const instance = create(options);

export default instance;
```

## 维护不同模块的后端服务接口

```javascript
// src/api/module/order.js
import http from "request-by-axios";
const { order } = http;

export default {
  list: function (params) {
    return order.get("url", {
      params,
      cancelModel: 2,
    });
  },
};

// src/api/module/user.js
import http from "request-by-axios";
const { user } = http;

export default {
  login: function (data, config) {
    return user.post("login", data, config);
  },
};
```

## Vue创建全局api

```javascript
import "./config";
import user from "./module/user";
import order from "./module/order";

const apiList = Object.assign({}, user, order);

function install(Vue) {
  if (install.installed) {
    return console.warn("api重复注册");
  }
  Object.defineProperties(Vue.prototype, {
    $api: {
      get() {
        return apiList;
      },
    },
  });
  install.installed = true;
}

export default {
  install,
};
```

## 调用

```html
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
      <button @click="sendUser2">
        调用接口传入或全局配置， 进行500系列提醒
      </button>
    </div>
    <div>
      参数去空格
      <button @click="sendUser3">参数去空格</button>
    </div>
  </div>
</template>
```

```javascript
export default {
  name: "Axios",
  methods: {
    sendUser() {
      this.$api.login();
    },
    sendOrder() {
      this.$api.list();
    },
    sendOrder2() {
      this.sendOrder();
      setTimeout(this.sendOrder, 2000);
    },
    sendUser2() {
      this.$api.login(
        { username: "", password: "" },
        {
          showErrorMsg: ({ response }) => {
            if (response.status === 404) {
              alert("接口未实现");
            }
          },
        }
      );
    },
    sendUser3() {
      const data = { username: " das f ", password: "zzzz " };
      this.$api.login(data, {
        beforeAxiosSend: function (config) {
          alert(
            "原数据:" +
              JSON.stringify(data) +
              "\n" +
              " 处理后数据:" +
              JSON.stringify(config.data)
          );
        },
        autoTrim: true,
      });
    },
  },
};
```
