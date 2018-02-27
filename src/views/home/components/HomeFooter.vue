<template>
    <el-footer class="footer-wrapper" height="auto">
        <div class="container">
        <el-row type="flex" class="footer-icons">
          <el-col :span="24">
            <a><v-icon name="facebook" base-class="icon-20"></v-icon></a>
            <a><v-icon name="twitter" base-class="icon-20"></v-icon></a>
            <a><v-icon name="instagram" base-class="icon-20"></v-icon></a>
            <a href=""><v-icon name="play" base-class="icon-20"></v-icon></a>
          </el-col>
        </el-row>
        <el-row type="flex" class="footer-nav">
          <el-col :span="24">
          <a href="">Home</a>
          <a href="">Tentang Kami</a>
          <a href="">Kontak</a>
          <a href="">Aturan</a>
          <a href="">Privasi</a>
          <a href="">Cara Menulis di Berita Baik</a>
          <a href="">Pedoman</a>
          </el-col>
        </el-row>
        <el-row type="flex" class="footer-copy">
          <el-col :span="12" >
          Copyright &copy; 2017 PT Warta Milenial Indonesia | <a>Term of Use</a> | <a>Privacy</a>
          </el-col>
          <el-col :span="12" style="text-align: right">
            <a>Sitemap</a> | <a>Contact Us</a>
          </el-col>
        </el-row>
        </div>
    </el-footer>
</template>

<script>
import img_logo from '@/assets/images/logo_beritabaik.png'
import img_b_logo from '@/assets/images/logo_beritabaik_b.png'
export default {
  data() {
    return {
      img_logo,
      img_b_logo
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

@import "src/styles/variables.scss";

.footer-wrapper{
    color: #FFF;
    background-color: #000;
    text-align: center;
    padding: 20px 0;
}
.footer-icons,
.footer-nav{
  margin-bottom: 20px;
}
.footer-icons a{
  padding: 0 10px;
}

.footer-nav a{
  padding: 0 10px;
}

</style>