<template>
    <el-footer class="footer-wrapper" height="auto">
        <div class="footer-wrapper-s1">
          <el-row type="flex" class="container">
            <el-col :span="24" class="footer-icons">              
              <a href="https://www.facebook.com/beritabaik.id/" target="_blank"><fa-icon name="facebook" scale="1" class="icon" ></fa-icon></a>
              <a href="https://twitter.com/beritabaik_id" target="_blank"><fa-icon name="twitter" scale="1" class="icon" ></fa-icon></a>
              <a href="https://www.instagram.com/beritabaik.id/" target="_blank"><fa-icon name="instagram" scale="1" class="icon" ></fa-icon></a>
              <a href="https://www.youtube.com/channel/UCMhqsN7csDXMaJCIvt3s0BQ?view_as=subscriber" target="_blank"><fa-icon name="youtube-square" scale="1" class="icon" ></fa-icon></a>
            </el-col>
          </el-row>
          <el-row type="flex" class="container">
            <el-col :span="24" class="footer-nav">
            <router-link :to="{ name: 'Home' }">Beranda</router-link>
            <router-link :to="{ name: 'tentang-kami-menu' }">Tentang Kami</router-link>
            <a href="#">Kontak</a>
            <a href="#">Aturan</a>
            <a href="#">Privasi</a>
            <a href="#">Cara Menulis di Berita Baik</a>
            <router-link :to="{ name: 'pedoman-menu' }">Pedoman </router-link>
            <!--
            <router-link :to="{ name: 'tentang-kami-menu' }">Tentang Kami</router-link>
            <router-link :to="{ name: 'kontak-menu' }">Kontak</router-link>
            <router-link :to="{ name: 'aturan-menu' }">Aturan</router-link>
            <router-link :to="{ name: 'privacy-menu' }">Privasi</router-link>
            <router-link :to="{ name: 'cara-menulis-menu' }">Cara Menulis di Berita Baik</router-link>
            <router-link :to="{ name: 'pedoman-menu' }">Pedoman </router-link>
            -->
            </el-col>
          </el-row>
        </div>
        <div class="footer-wrapper-s2">
          <el-row type="flex" class="container footer-copy">
            <el-col :span="12" >
            Copyright &copy; 2018 PT Warta Milenial Indonesia&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#">Term of Use</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="#">Privacy</a>
            <!--
            <router-link :to="{ name: 'aturan-menu' }">Term of Use</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
            <router-link :to="{ name: 'privacy-menu' }">Privacy</router-link>
            -->
            </el-col>
            <el-col :span="12" style="text-align: right">
              <a href="#">Sitemap</a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a href="#">Contact Us</a>
              <!--
              <router-link :to="{ name: 'sitemap-menu' }">Sitemap</router-link>&nbsp;&nbsp;|&nbsp;&nbsp;
              <router-link :to="{ name: 'kontak-menu' }">Contact Us</router-link>
              -->
            </el-col>
          </el-row>
        </div>
    </el-footer>
</template>

<script>
export default {
  name: 'HomeFooter',
  data() {
    return {
      state: false
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";

.el-footer{
  text-align: center;
  margin: 0  ;
  padding: 0;
}

.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}

.footer{
  &-wrapper{
    &-s1{
      background-color: #333;
      padding: 30px 0 20px 0;      
      a, a:visited {
        color: #FEFEFE;  
      }
      a:hover, a:active{
        color: #CCC;
      }
    }
    &-s2{
      text-align: left;
      background-color: #1A1A1A;
      padding: 16px 0;
      color: #666;
      font-size: 0.6em;
      a, a:visited{
        color: #666;
      }
      a:hover, a:active{
        color: #ccc;
      }
    }
  }
  &-icons{
    a{
      padding: 0 6px;
    }
    .icon{
      width: 34px;
      height: 34px;
      border-radius: 50%;
      padding: 6px;
      border: 2px solid $bb-white-menu;
    }
  }
  &-nav{
    font-size: 0.6em;
    text-transform: uppercase;
    font-weight: 700;
    a{
      padding: 0 10px;
    }    
  }
}


</style>