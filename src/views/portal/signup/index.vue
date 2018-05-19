<template>
  <div class="signup">      
      <div class="signup-box">
        <div class="logo">
            <a href="#/home">
              <img :src="img_b_logo" alt="beritabaik.id">
            </a>          
        </div>
        
        <div class="form">
            <div>
              <span>Buat Akun Kamu Sekarang!</span>
            </div>
            <el-form ref="signupVM" :model="signupVM" :rules="rules"  >
                <el-form-item label="" prop="name">
                    <el-input v-model="signupVM.name" placeholder="Nama" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="email">
                    <el-input v-model="signupVM.email" placeholder="Alamat Surel" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="" prop="password">
                    <el-input v-model="signupVM.password" type="password" placeholder="Password" auto-complete="off" ></el-input>
                </el-form-item>
                <el-form-item label="" prop="confirmPassword">
                    <el-input v-model="signupVM.confirmPassword" type="password" placeholder="Konfirmasi Password" auto-complete="off"></el-input>
                </el-form-item>
                <el-row :gutter="20" class="align-center">
                    <el-col :span="24">
                        <el-button type="primary" round :loading="loading" @click.native.prevent="handleSignup">Daftar</el-button>
                    </el-col>                  
                </el-row>
            </el-form>
        </div>
        <div class="options">
            <div class="signup-label">
              <span>Atau Daftar Dengan</span>
            </div>
            <div class="signup-with"> 
            <fb-signin-button
                :params="fbSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                <fa-icon name="facebook" class="icon" ></fa-icon>
              </fb-signin-button>
              <g-signin-button
                :params="googleSignInParams"
                @success="onSignInSuccess"
                @error="onSignInError">
                <fa-icon name="google-plus" class="icon" ></fa-icon>
              </g-signin-button>
            </div>
            <div class="login"> 
                <span> Sudah Punya Akun? 
                  <router-link :to="{ name: 'public-login' }">
                    <a>Masuk Sekarang</a> 
                  </router-link>
                </span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import { getUserByEmail } from '@/api/login'

import img_b_logo from '@/assets/images/ikon_berita_baik.png'

export default {
  name: 'PortalSignup',
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Silakan Isi Password'))
      } else {
        if (this.signupVM.confirmPassword !== '') {
          this.$refs.signupVM.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Silakan Ulangi Password anda'))
      } else if (value !== this.signupVM.password) {
        callback(new Error('Password tidak sama'))
      } else {
        callback()
      }
    }
    const validateEmailExists = (rule, value, callback) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      if (value === '') {
        callback(new Error('Silakan Isi Email'))
      } else if (!re.test(String(value).toLowerCase())) {
        callback(new Error('Silakan Isi Dengan Format Email Yang Sesuai'))
      } else {
        getUserByEmail(value).then(response => {
          if (response && response.data && response.data.status === 'ok') {
            callback()
          }
        })
          .catch(error => {
            console.error(error)
            callback(new Error('Email Sudah Digunakan'))
          })
      }
    }
    return {
      title: '',
      loading: false,
      img_b_logo,
      signupVM: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        username: null,
        active: true,
        id_number: '-',
        id_number_type: 'ktp',
        status: 'inactive'
      },
      rules: {
        name: [
          { required: true, message: 'Silahkan Isi Nama', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Silahkan Isi Email', trigger: 'blur' },
          // { type: 'email', message: 'Silakan Isi Sesuai Dengan Format Email', trigger: ['blur', 'change'] },
          { validator: validateEmailExists, trigger: ['change'] }
        ],
        password: [
          { trigger: 'blur', validator: validatePass }
        ],
        confirmPassword: [
          { trigger: 'blur', validator: validatePass2 }
        ]
      },
      fbSignInParams: {
        // scope: 'email,user_likes',
        scope: 'email',
        return_scopes: true
      },
      googleSignInParams: {
        client_id: '41162363474-mo2568h4vs3tbs8pgepog137sbg148fa.apps.googleusercontent.com'
      }
    }
  },
  created() {
    console.log('PortalSignup')
  },
  methods: {
    handleSignup() {
      this.$refs.signupVM.validate(valid => {
        if (valid) {
          this.signupVM.username = this.signupVM.email
          this.loading = true
          this.$store.dispatch('Signup', this.signupVM).then(() => {
            this.loading = false
            this.$router.push({ path: '/home' })
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.error('error submit!!')
          return false
        }
      })
    },
    onSignInSuccess(response, googleUser) {
      /*
      FB.api('/me', dude => {
        console.log(`Good to see you, ${dude.name}.`)
      })
      */
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      // const profile = googleUser.getBasicProfile() // etc etc
    },
    onSignInError(error) {
      // `error` contains any error occurred.
      console.log('OH NOES', error)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/portal-signup.scss";
</style>