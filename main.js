import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import uviewPlus from '@/uni_modules/uview-plus'
import store from './store'
import "./utils/request.js"
export function createApp() {
  const app = createSSRApp(App)
  app.use(uviewPlus)
  app.use(store)
  uni.$u.setConfig({
  	// 修改$u.config对象的属性
  	config: {
  		// 修改默认单位为rpx，相当于执行 uni.$u.config.unit = 'rpx'
  		unit: 'rpx'
  	},
  	// 修改$u.props对象的属性
  	props: {
  		// 修改radio组件的size参数的默认值，相当于执行 uni.$u.props.radio.size = 30
  		radio: {
  			size: 15
  		}
  		// 其他组件属性配置
  		// ......
  	}
  })
  return {
    app
  }
}
// #endif