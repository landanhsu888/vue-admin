import Vue from 'vue'
import App from './App.vue'
import indexRouter from './routers/index'
import store from './store'
import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'
import i18n from './lang' // Internationalization


import capitalizeFilter from './filters/capitalize'
import formatTimeFilter from './filters/formatTime'
import numberFormatterFilter from './filters/numberFormatter'
import parseTimeFilter from './filters/parseTime'
import timeAgoFilter from './filters/timeAgo'
import toThousandFilterFilter from './filters/toThousandFilter'

Vue.use(ElementUI, {
  size: 'medium', // set element-ui default size
  i18n: (key: any, value: any) => i18n.t(key, value)
})

Vue.filter('capitalize', capitalizeFilter)
Vue.filter('formatTime', formatTimeFilter)
Vue.filter('numberFormatter', numberFormatterFilter)
Vue.filter('parseTime', parseTimeFilter)
Vue.filter('timeAgo', timeAgoFilter)
Vue.filter('toThousandFilter', toThousandFilterFilter)

Vue.config.productionTip = false

new Vue({
  router: indexRouter,
  store: store,
  render: h => h(App)
}).$mount('#app')
