import Vue from 'vue'
import App from './App.vue'
import indexRouter from './routers/index'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import capitalizeFilter from './filters/capitalize'

Vue.use(ElementUI)

Vue.filter('capitalize', capitalizeFilter)

Vue.config.productionTip = false

new Vue({
  router: indexRouter,
  store: store,
  render: h => h(App)
}).$mount('#app')
