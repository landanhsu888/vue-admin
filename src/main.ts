import Vue from 'vue'
import App from './App.vue'
import indexRouter from './routers/index'
import store from './store'
import Cookies from 'js-cookie'

import './registerServiceWorker'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/index.scss'

import capitalizeFilter from './filters/capitalize'
import formatTimeFilter from './filters/formatTime'
import numberFormatterFilter from './filters/numberFormatter'
import parseTimeFilter from './filters/parseTime'
import timeAgoFilter from './filters/timeAgo'
import toThousandFilterFilter from './filters/toThousandFilter'

import VueI18n from 'vue-i18n'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'// element-ui lang
import enLang from './langs/en'
import zhLang from './langs/zh'

Vue.use(ElementUI, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

Vue.use(VueI18n)

const messages = {
  en: {
    ...enLang,
    ...elementEnLocale
  },
  zh: {
    ...zhLang,
    ...elementZhLocale
  }
}

const i18n = new VueI18n({
  locale: Cookies.get('language') || 'en',
  messages
})

/* filter */

Vue.filter('capitalize', capitalizeFilter)
Vue.filter('formatTime', formatTimeFilter)
Vue.filter('numberFormatter', numberFormatterFilter)
Vue.filter('parseTime', parseTimeFilter)
Vue.filter('timeAgo', timeAgoFilter)
Vue.filter('toThousandFilter', toThousandFilterFilter)

/* filter */

Vue.config.productionTip = false

new Vue({
  router: indexRouter,
  store: store,
  i18n: i18n,
  render: h => h(App)
}).$mount('#app')
