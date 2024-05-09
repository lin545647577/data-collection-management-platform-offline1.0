import './assets/style/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'dayjs/locale/zh-cn';
import locale from 'element-plus/es/locale/lang/zh-cn';
import 'virtual:svg-icons-register'
import ECharts from 'vue-echarts' 
import "echarts";  

import App from './App.vue'
import router from './router'

const app = createApp(App)
// 挂载ECharts   
app.component('ECharts',ECharts)
app.use(createPinia())
app.use(router)
app.use(ElementPlus,{locale})
app.mount('#app')
