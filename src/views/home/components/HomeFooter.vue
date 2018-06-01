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
            <a href="">Beranda</a>
            <a href=""><router-link :to="{ name: 'tentang-kami-menu' }">Tentang Kami</router-link></a>
            <a href="">Kontak</a>
            <a href="">Aturan</a>
            <a href="">Privasi</a>
            <a href="">Cara Menulis di Berita Baik</a>
            <a href=""><router-link :to="{ name: 'pedoman-menu' }">Pedoman </router-link></a>
            </el-col>
          </el-row>
        </div>
        <div class="footer-wrapper-s2">
          <el-row type="flex" class="container footer-copy">
            <el-col :span="12" >
            Copyright &copy; {{new Date().getFullYear()}} PT Warta Milenial Indonesia&nbsp;&nbsp;|&nbsp;&nbsp;
            <a>Term of Use</a>&nbsp;&nbsp;|&nbsp;&nbsp;
            <a>Privacy</a>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <a>Sitemap</a>&nbsp;&nbsp;|&nbsp;&nbsp;
              <a>Contact Us</a>
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