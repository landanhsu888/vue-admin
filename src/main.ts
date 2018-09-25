import Vue from 'vue'
import App from './App.vue'
import indexRouter from './routers/index'
import indexStore from './store/index'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router: indexRouter,
  store: indexStore,
  render: h => h(App)
}).$mount('#app')
