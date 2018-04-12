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
            <el-form ref="signup-form" :model="form" >
                <el-form-item label="">
                    <el-input v-model="signupVM.username" placeholder="Nama"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="signupVM.email" placeholder="Alamat Surel"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="signupVM.password" type="password" placeholder="Password" ></el-input>
                </el-form-item>
                <el-row :gutter="20" class="align-center">
                    <el-col :span="24">
                        <el-button type="primary" round>Daftar</el-button>
                    </el-col>                  
                </el-row>
            </el-form>
        </div>
        <div class="options">
            <div class="signup-label">
              <span>Atau Daftar Dengan</span>
            </div>
            <div class="signup-with"> 
                <!--
                <v-icon name="facebook" base-class="icon-0dot8em v-align-middle"></v-icon>
                <v-icon name="mail" base-class="icon-0dot8em v-align-middle"></v-icon>
                -->
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
                <span> Sudah Punya Akun? <a>Masuk Sekarang</a> </span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import img_b_logo from '@/assets/images/ikon_berita_baik.png'

export default {
  name: 'PortalSignup',
  data() {
    return {
      title: '',
      img_b_logo,
      signupVM: {
        username: '',
        email: '',
        password: ''
      },
      fbSignInParams: {
        // scope: 'email,user_likes',
        scope: 'email',
        return_scopes: true
      },
      googleSignInParams: {
        client_id: '945256359753-38gpkeqcipc5nn3kts9f3frark3ut5pr.apps.googleusercontent.com'
      }
    }
  },
  created() {
    console.log('PortalSignup')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/portal-signup.scss";
</style>