<template>
  <div class="signin-container">

    <el-form ref="signinForm" :model="signinForm" :rules="signinRules" class="signin-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">{{ $t('signin.title') }}</h3>
        <lang-select class="set-language"/>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <user-svg class="svg-icon" />
        </span>
        <el-input
          v-model="signinForm.username"
          :placeholder="$t('signin.username')"
          name="username"
          type="text"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <password-svg class="svg-icon"/>
        </span>
        <el-input
          :type="passwordType"
          v-model="signinForm.password"
          :placeholder="$t('signin.password')"
          name="password"
          auto-complete="on"
          @keyup.enter.native="handleSignin" />
        <span class="show-pwd" @click="showPwd">
          <eye-svg class="svg-icon" />
        </span>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleSignin">{{ $t('signin.signin') }}</el-button>

      <div class="tips">
        <span>{{ $t('signin.username') }} : admin</span>
        <span>{{ $t('signin.password') }} : {{ $t('signin.any') }}</span>
      </div>
      <div class="tips">
        <span style="margin-right:18px;">{{ $t('signin.username') }} : editor</span>
        <span>{{ $t('signin.password') }} : {{ $t('signin.any') }}</span>
      </div>

      <el-button class="thirdparty-button" type="primary" @click="showDialog=true">{{ $t('signin.thirdparty') }}</el-button>
    </el-form>

    <el-dialog :title="$t('signin.thirdparty')" :visible.sync="showDialog" append-to-body>
      {{ $t('signin.thirdpartyTips') }}
      <br>
      <br>
      <br>
      <social-sign />
    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator'

import { isvalidUsername } from '@/utils/validate'
import LangSelect from '@/components/LangSelect/index.vue'
import SocialSign from './socialSignin.vue'

import userSvg from '@/svg/user.svg'
import eyeSvg from '@/svg/eye.svg'
import passwordSvg from '@/svg/password.svg'

@Component({
  name: 'Signin',
  components: {
  LangSelect,
  SocialSign,
  userSvg,
  eyeSvg,
  passwordSvg
  }
  })
class Signin extends Vue {
  public signinForm: object = {
    username: 'admin',
    password: '1111111'
  }

  public signinRules: object = {
    username: [{
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (!isvalidUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
    }],
    password: [{
      required: true,
      trigger: 'blur',
      validator: (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
    }]
  }

  public passwordType: string = 'password'

  public loading: boolean = false

  public showDialog: boolean = false

  public redirect: any = undefined

  @Watch ('$route')
  public $routeHandler (route: any): void {
    this.redirect = route.query && route.query.redirect
  }
  
  created () {
    // window.addEventListener('hashchange', this.afterQRScan)
  }

  destroyed () {
    // window.removeEventListener('hashchange', this.afterQRScan)
  }

  showPwd () {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
  }

  handleSignin () {
    this.$store.dispatch('AUTHETICATION_POST_SIGNIN', this.signinForm).then(() => {
      this.loading = false
      this.$router.push({ path: this.redirect || '/' })
    }).catch(() => {
      this.loading = false
    })
  }

  afterQRScan () {
    // const hash = window.location.hash.slice(1)
    // const hashObj = getQueryObject(hash)
    // const originUrl = window.location.origin
    // history.replaceState({}, '', originUrl)
    // const codeMap = {
    //   wechat: 'code',
    //   tencent: 'code'
    // }
    // const codeName = hashObj[codeMap[this.auth_type]]
    // if (!codeName) {
    //   alert('第三方登录失败')
    // } else {
    //   this.$store.dispatch('LoginByThirdparty', codeName).then(() => {
    //     this.$router.push({ path: '/' })
    //   })
    // }
  }
}
export default Signin
</script>

<style rel="stylesheet/scss" lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#283443;
  $light_gray:#eee;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .signin-container .el-input input{
      color: $cursor;
      &::first-line {
        color: $light_gray;
      }
    }
  }

  /* reset element-ui css */
  .signin-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 90%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        caret-color: $cursor;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;

  .signin-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .signin-form {
      position: absolute;
      left: 0;
      right: 0;
      width: 520px;
      max-width: 100%;
      padding: 35px 35px 15px 35px;
      margin: 120px auto;
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      fill: $dark_gray;
    }
    .title-container {
      position: relative;
      .title {
        font-size: 26px;
        color: $light_gray;
        margin: 0px auto 40px auto;
        text-align: center;
        font-weight: bold;
      }
      .set-language {
        color: #fff;
        position: absolute;
        top: 5px;
        right: 0px;
        fill: #fff;
      }
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
      fill: $dark_gray;
    }
    .thirdparty-button {
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
  }
  .svg-icon.language {
    width: 1.6em;
    height: 1.6em;
    
    path {
      transform: scale(0.16);
    }
  }
</style>
