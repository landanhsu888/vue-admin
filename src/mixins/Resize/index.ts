import { Component, Prop, Vue } from 'vue-property-decorator'

import { debounce } from '../../utils/index'

@Component
class Resize extends Vue {
  public chart: any;
  public __resizeHandler: any;

  mounted () {
    this.__resizeHandler = debounce(() => {
      if (this.chart) {
        this.chart.resize()
      }
    }, 100, void 0)
    window.addEventListener('resize', this.__resizeHandler)

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.addEventListener('transitionend', this.sidebarResizeHandler)
  }

  beforeDestroy () {
    window.removeEventListener('resize', this.__resizeHandler)

    const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
    sidebarElm.removeEventListener('transitionend', this.sidebarResizeHandler)
  }

  sidebarResizeHandler (e: any) {
    if (e.propertyName === 'width') {
      this.__resizeHandler()
    }
  }
}
export default Resize
