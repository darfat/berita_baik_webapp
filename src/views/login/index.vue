<template>
  <div class="login">      
      <div class="login-box">
        <div class="logo">
            <a href="#/home">
              <img :src="img_b_logo" alt="beritabaik.id">
            </a>          
        </div>        
        <div class="form" v-if="showNative">
            <el-form autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
                class="card-box login-form">
                <el-form-item prop="username">
                  <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                  </span>
                  <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="Username atau Alamat Surel" />
                </el-form-item>
                <el-form-item prop="password">
                  <span class="svg-container">
                    <svg-icon icon-class="password"></svg-icon>
                  </span>
                  <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                    placeholder="Password"></el-input>
                    <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div><a @click="clickResetPassDialog(true)"> Lupa Sandi ? </a></div>
                        <div><el-checkbox v-model="checked">Ingat Saya</el-checkbox></div>
                    </el-col>
                    <el-col :span="12" class="align-right">
                        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
                          Masuk
                        </el-button>
                    </el-col>
                </el-row>                                
              </el-form>
        </div>
        <div class="options">
            <div class="login-with"> 
              <h2 v-if="!showNative">Login Menggunakan </h2>
              <el-button type="text">
              <fb-signin-button
                :params="fbSignInParams"
                @success="onFBSignInSuccess"
                @error="onSignInError">
                <fa-icon name="facebook" class="icon" ></fa-icon>
              </fb-signin-button>
              </el-button>
              <el-button type="text">
              <g-signin-button
                :params="googleSignInParams"
                @success="onGoogleSignInSuccess"
                @error="onSignInError">
                <fa-icon name="google-plus" class="icon" ></fa-icon>
              </g-signin-button>
              </el-button>
            </div>            
            <div class="sign-up" v-if="showNative"> 
                <span> Belum Mendaftar ? 
                  <router-link :to="{ name: 'public-signup' }">
                    <a>Daftar Sekarang</a> 
                  </router-link>
                </span>
            </div>
        </div>
        <el-dialog title="Reset Password" :visible.sync="showResetPassDialog" class="card-box login-form" width="30%"
  center :modalAppendToBody="false">
                  <el-form :model="resetPassForm"  ref="resetPassForm" >
                      <el-input ref="resetPassEmailInput" v-model="resetPassForm.email" type="email" auto-complete="off" placeholder="Masukan Email"></el-input>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="showResetPassDialog = false">Cancel</el-button>
                    <el-button type="success" @click="resetPassword()">Confirm</el-button>
                  </span>
        </el-dialog>
      </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import img_b_logo from '@/assets/images/ikon_berita_baik.png'
import { sendEmailResetPassword } from '@/api/login'

export default {
  name: 'login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('Invalid UserName'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('Invalid Password'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password',
      img_b_logo,
      checked: false,
      fbSignInParams: {
        // scope: 'email,user_likes',
        scope: 'user_birthday, public_profile',
        return_scopes: true
      },
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: '41162363474-mo2568h4vs3tbs8pgepog137sbg148fa.apps.googleusercontent.com'
      },
      showNative: true,
      showResetPassDialog: false,
      resetPassForm: {
        email: ''
      }
    }
  },
  methods: {
    showPwd() {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    clickResetPassDialog(val) {
      this.showResetPassDialog = val
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            this.loading = false
            this.$router.push({ path: '/home' })
          }).catch((err) => {
            console.log(err)
            this.$message.warning('Gagal Login')
            this.loading = false
          })
        } else {
          console.error('error submit!!')
          return false
        }
      })
    },
    onGoogleSignInSuccess(response, googleUser) {
      const userInfo = {
        username: response.w3.Eea,
        email: response.w3.U3,
        name: response.w3.ig,
        image_path: response.w3.Paa
      }
      this.loading = true
      this.$store.dispatch('LoginSignupGmail', userInfo).then(() => {
        this.loading = false
        this.$router.push({
          path: '/home'
        })
      }).catch(() => {
        this.loading = false
      })
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // const profile = googleUser.getBasicProfile() // etc etc
    },

    onFBSignInSuccess(response) {
      window.FB.api('/me?fields=id,name,about,birthday', dude => {
        this.loading = true
        this.$store.dispatch('LoginSignupFB', dude).then(() => {
          this.loading = false
          this.$router.push({
            path: '/home'
          })
        }).catch(() => {
          this.loading = false
        })
      })
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    },
    resetPassword() {
      this.showResetPassDialog = false
      sendEmailResetPassword({ email: this.resetPassForm.email }).then(response => {
        if (response) {
          this.$message({
            type: 'success',
            message: 'Silakan cek email untuk melihat password terbaru, Terima Kasih'
          })
        }
      }).catch(error => {
        console.log(error)
        this.$message.warning('Terjadi Kesalahan \n')
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/portal-login.scss";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #000;
$lightest_gray: #eef5f8;

.el-row {
  margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }


.form {
    input:-webkit-autofill {
      -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
      -webkit-text-fill-color: #2d3a4b !important;
    }
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $dark_gray;
      height: 47px;
    }
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      font-weight: 400;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .login-form {
      // position: absolute;
      // left: 0;
      // right: 0;
      // width: 400px;
      // padding: 35px 35px 15px 35px;
      // margin: 120px auto;
    }
    .el-form-item {
      //border: 1px solid rgba(255, 255, 255, 0.1);
      // background: $lightest_gray;// rgba(0, 0, 0, 0.1);
      border: 1px solid $dark_gray;
      border-radius: 5px;
      color: #454545;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select:none;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner, .el-checkbox__input.is-indeterminate .el-checkbox__inner {
        background-color: $main-blue;
        border-color: $main-blue;
    }
    .el-checkbox__input.is-focus .el-checkbox__inner,
    .el-checkbox__inner:hover {
      border-color: $main-blue;
    }
    .el-checkbox__input.is-checked+.el-checkbox__label {
      color: $main-blue;
    }
    .thirdparty-button{
      position: absolute;
      right: 35px;
      bottom: 28px;
    }
    .el-button{
      background-color: $main-blue;
      color: #fff;
      border: none;
      border-radius : 20px; 
    }
  }
  
</style>
