import { createApp } from 'vue'
import ElmentPlus from 'element-plus'
import {router} from './router'
import store from './store'

import "element-plus/dist/index.css"
import './assets/css/tailwind.css'
import "nprogress/nprogress.css"
import'normalize.css/normalize.css'


import './utils/permission.js'


import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(store).use(ElmentPlus).use(router).mount('#app')

