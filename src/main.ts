import Vue from 'vue'
import App from './App.vue'
import indexRouter from './routers/index'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import SvgIcon from './components/SvgIcon.vue'

import capitalizeFilter from './filters/capitalize'

import Icon from 'vue-svg-icon/Icon.vue'

Vue.use(ElementUI)
Vue.component('icon', Icon)

Vue.component('svg-icon', SvgIcon)

// const req = require.context('./svg', false, /\.svg$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// requireAll(req)

Vue.filter('capitalize', capitalizeFilter)

Vue.config.productionTip = false

new Vue({
  router: indexRouter,
  store: store,
  render: h => h(App)
}).$mount('#app')
