import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'
// 全局引入echarts，兼容两种写法：组件内import / this.$echarts
import * as echarts from 'echarts'

const app = createApp(App)
app.config.globalProperties.$echarts = echarts
app.use(router)
app.mount('#app')