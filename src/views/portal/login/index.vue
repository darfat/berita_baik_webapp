<template>
  <div class="login">      
      <div class="login-box">
        <div class="logo">
            <a href="#/home">
              <img :src="img_b_logo" alt="beritabaik.id">
            </a>          
        </div>
        <div class="form">
            <el-form ref="login-form" :model="form" >
                <el-form-item label="">
                    <el-input v-model="loginVM.username" placeholder="Username atau Alamat Surel"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-input v-model="loginVM.password" type="password" placeholder="Password" ></el-input>
                </el-form-item>
                <el-row :gutter="20">
                    <el-col :span="12">
                        <div> <a> Lupa Sandi ? </a></div>
                        <div>   <el-checkbox v-model="checked">Ingat Saya</el-checkbox>  </div>
                    </el-col>
                    <el-col :span="12" class="align-right">
                        <el-button type="primary" round>Masuk</el-button>
                    </el-col>
                </el-row>
            </el-form>
        </div>
        <div class="options">
            <div class="login-with"> 
                <v-icon name="facebook" base-class="icon-0dot8em v-align-middle"></v-icon>
                <v-icon name="mail" base-class="icon-0dot8em v-align-middle"></v-icon>
            </div>
            <div class="sign-up"> 
                <span> Belum Mendaftar ? <a>Daftar Sekarang</a> </span>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import img_b_logo from '@/assets/images/logo_beritabaik_b.png'

export default {
  name: 'PortalLogin',
  data() {
    return {
      title: '',
      img_b_logo,
      loginVM: {
        username: '',
        password: ''
      }
    }
  },
  created() {
    console.log('PortalLogin')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/portal-login.scss";

#app{
    background-image: url("/static/images/login-bg.jpg");
   background-color: #fff;
}
</style>