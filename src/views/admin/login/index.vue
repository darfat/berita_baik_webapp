<template>
  <div class="login">      
      <div class="login-box">
        <div class="logo">
            <a href="#/home">
              <img :src="img_b_logo" alt="beritabaik.id">
            </a>          
        </div>        
        <div class="form">
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
                        <div><a> Lupa Sandi ? </a></div>
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
            
        </div>
      </div>
  </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate'
import img_b_logo from '@/assets/images/ikon_berita_baik.png'
/* eslint-disable */
export default {
  name: 'cmsLogin',
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
      checked: false
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
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('Login', this.loginForm).then(() => {
            console.log('login success')
            this.loading = false
            this.$router.push({ path: '/home' })
            var self = this;
            window.setTimeout(function() {
              self.$router.push({ path: '/cms' })
            }, 100)
          })
          .catch(error => {
            this.$message.warning('Login Tidak Berhasil')
            this.loading = false
          })
        } else {
          console.error('error submit!!')
          this.$message.warning('Terjadi kesalahan')
          return false
        }
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
