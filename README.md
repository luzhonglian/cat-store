# 小猫商店-移动端全栈项目（Uniapp+Vue3.2+Nodejs+MongoDB）

## 目录

- [小猫商店-移动端全栈项目（Uniapp+Vue3.2+Nodejs+MongoDB）](#小猫商店-移动端全栈项目uniappvue32nodejsmongodb)
  - [目录](#目录)
  - [项目演示 ](#项目演示-)
  - [项目介绍 ](#项目介绍-)
    - [前端：Uniapp+UView-Plus 3.0+Vue3.2+Vuex](#前端uniappuview-plus-30vue32vuex)
    - [后端：express+multer+mongoDB 编写](#后端expressmultermongodb-编写)
  - [项目运行准备 ](#项目运行准备-)
  - [项目运行 ](#项目运行-)
  - [开发中的踩坑记录 ](#开发中的踩坑记录-)
  - [感想 ](#感想-)

## 项目演示 <a name = "demo"></a>

https://www.bilibili.com/video/BV1Lw411q7ZS

## 项目介绍 <a name = "about"></a>

### 前端：Uniapp+UView-Plus 3.0+Vue3.2+Vuex

[主页](pages/index/index.vue)  
[商品分类](pages/search/search.vue)  
[购物车](pages/cart/cart.vue)  
[订单](pages/order/order.vue)  
[用户页](pages/user/user.vue)

### 后端：express+multer+mongoDB 编写

[后端源码](https://github.com/luzhonglian/pretty-cat/tree/main/server)

**项目内容**： 略多，详见项目演示

## 项目运行准备 <a name = "getting_started"></a>

**安装 node、npm、mongoDB、Hbulder X**

## 项目运行 <a name = "usage"></a>

```cmd
//下载server后
npm install
npm start
//连接mongoDB，推荐使用compass

//将cat-store放进HBuilder X环境里
//先安装相关依赖
npm install
//点击HBuilder X里的运行
```

## 开发中的踩坑记录 <a name = "bug"></a>

**-用 uview-plus 的标签报错**

```html
<up-button type="success" :plain="true" text="镂空"> </up-button>
<!-- 用up会报错 -->
<u-button type="success" :plain="true" text="镂空"> </u-button>
<!-- 把up换成u就可以 -->
```

**-本地代理服务器配置官方文档只有 vue2 的，不适用于 vue3，搜索一番得到 vue3 的配置方法**

```javascript
//vite.config.js
import { defineConfig } from "vite";
import uni from "@dcloudio/vite-plugin-uni";

export default defineConfig({
  plugins: [uni()],
  server: {
    proxy: {
      "/store-api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
```

**-直接从 defineProps 里解构会失去响应式，导致拿不到最新的值，要用 toRefs 保持响应式**

```javascript
//CartItem.vue
let props = defineProps(["img", "name", "price", "count", "isSelected"]);
let { img, name, count, price, isSelected } = toRefs(props);
```

**-< u--input> 设置 border 无效，uview 提供的 api:customStyle 也无效果**

```css
//user.vue
//改用box-shadow得以平替
.input {
  box-shadow: 0 0 1px black;
}
```

**-切换用户登录后会触发 orderItem 和 goodItem 的 onShow，而且打印的数据还是还是上一个用户的**

```html
<!-- 
order.vue
原因是在order.vue里设置了
store.state.token的判断 
换用户登后token改变，会重新加载
-->
<view class="order" v-if="store.state.token">
  <!-- 取消该判断，用其他数据控制显示 --></view
>
```

**-切换用户登录后进入订单，发现渲染的数据是上一个用户的，但打印的是最新 get 到的数据**

```javascript
//order.vue
onShow(
() => {
    if (!store.state.token) {
    ....
    } else {
      getOrderList()
        }
        }
    )
```

```html
<!-- 原因是组件渲染是同步的，
而获取最新的orderList方法是异步的，
在orList更新前子组件仍然用旧的值进行渲染
  -->
<view v-if="!isEmpty" v-for="order in orderList" :key="order._id">
  <order-item v-bind="order"></order-item>
</view>
```

```html
<!-- 解决方案是在getList结束后再渲染子组件
用isOrder进行v-if的判定
-->
<view class="" v-if="store.state.isOrder">
  <!--子组件的渲染 -->
</view>
```

```javascript
const getOrderList = async () => {
    ....
    //在函数的最后把isOrder变为true，
    //且每次退出登录都改为false
    store.commit('setIsOrder', true)
}
```

**-在微信小程序上测试时报错  
TypeError: Cannot read property 'setItem' of undefined  
定位是 vuex-persistedstate 的问题，其默认使用的是 window 的 storage，这个小程序里没有**

```javascript
//在store/index.js里用兼容性的uni类storage
plugins: [
  createPersistedState({
    storage: {
      getItem: (key) => uni.getStorageSync(key),
      setItem: (key, val) => uni.setStorageSync(key, val),
      removeItem: (key) => uni.removeStorageSync(key),
    },
  }),
];
```

**-在微信小程序发现发送请求后会丢失 token，原因是 H5 拿到 token 靠 header.authorization，小程序靠 header.Authorization**

```javascript
//utils/request.js
//加个判断
store.commit("setToken", header.authorization || header.Authorization);
```

## 感想 <a name = "opinion"></a>

一端开发，多端做兼容
