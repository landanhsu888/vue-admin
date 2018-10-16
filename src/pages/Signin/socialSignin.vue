<template>
  <div class="social-signup-container">
    <div class="sign-btn" @click="wechatHandleClick('wechat')">
      <span class="wx-svg-container"><wechatSvg class="icon"/></span> 微信
    </div>
    <div class="sign-btn" @click="tencentHandleClick('tencent')">
      <span class="qq-svg-container"><qqSvg class="icon"/></span> QQ
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect//index.vue'

import wechatSvg from '@/svg/wechat.svg'
import qqSvg from '@/svg/qq.svg'

@Component({
  name: 'SocialSignin',
  components: {
  }
  })
class SocialSignin extends Vue {
  created () {
    // window.addEventListener('hashchange', this.afterQRScan)
  }

  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }

  wechatHandleClick (thirdpart) {
    alert('ok')
    // this.$store.commit('SET_AUTH_TYPE', thirdpart)
    // const appid = 'xxxxx'
    // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
    // const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
    // openWindow(url, thirdpart, 540, 540)
  }

  tencentHandleClick (thirdpart) {
    alert('ok')
    // this.$store.commit('SET_AUTH_TYPE', thirdpart)
    // const client_id = 'xxxxx'
    // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
    // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
    // openWindow(url, thirdpart, 540, 540)
  }
}

export default SocialSignin
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  .social-signup-container {
    margin: 20px 0;
    .sign-btn {
      display: inline-block;
      cursor: pointer;
    }
    .icon {
      color: #fff;
      font-size: 24px;
      margin-top: 8px;
    }
    .wx-svg-container,
    .qq-svg-container {
      display: inline-block;
      width: 40px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      padding-top: 1px;
      border-radius: 4px;
      margin-bottom: 20px;
      margin-right: 5px;
    }
    .wx-svg-container {
      background-color: #8ada53;
    }
    .qq-svg-container {
      background-color: #6BA2D6;
      margin-left: 50px;
    }
  }
</style>
