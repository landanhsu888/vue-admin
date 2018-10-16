import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import store from '@/store'

const { body } = document
const WIDTH = 1024
const RATIO = 3

@Component
class ResizeHandler extends Vue {
  public device: string = ''
  public sidebar: any = void 0

  @Watch('$route', { immediate: true, deep: true })
  $routerHandler (route: any) {
    if (this.device === 'mobile' && this.sidebar.opened) {
      store.dispatch('closeSideBar', { withoutAnimation: false })
    }
  }

  beforeMount () {
    window.addEventListener('resize', this.resizeHandler)
  }

  mounted () {
    const isMobile = this.isMobile()
    if (isMobile) {
      store.dispatch('toggleDevice', 'mobile')
      store.dispatch('closeSideBar', { withoutAnimation: true })
    }
  }

  isMobile () {
    const rect = body.getBoundingClientRect()
    return rect.width - RATIO < WIDTH
  }

  resizeHandler () {
    if (!document.hidden) {
      const isMobile = this.isMobile()
      store.dispatch('toggleDevice', isMobile ? 'mobile' : 'desktop')

      if (isMobile) {
        store.dispatch('closeSideBar', { withoutAnimation: true })
      }
    }
  }
}
export default ResizeHandler
