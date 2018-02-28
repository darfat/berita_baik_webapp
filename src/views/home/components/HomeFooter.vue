<template>
    <el-footer class="footer-wrapper" height="auto">
        <div class="footer-wrapper-s1">
          <el-row type="flex" class="container footer-icons">
            <el-col :span="24">              
              <a><v-icon name="facebook" base-class="icon-20"></v-icon></a>
              <a><v-icon name="twitter" base-class="icon-20"></v-icon></a>
              <a><v-icon name="instagram" base-class="icon-20"></v-icon></a>
              <a href=""><v-icon name="play" base-class="icon-20"></v-icon></a>
            </el-col>
          </el-row>
          <el-row type="flex" class="container footer-nav">
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
        </div>
        <div class="footer-wrapper-s2">
          <el-row type="flex" class="container footer-copy">
            <el-col :span="12" >
            Copyright &copy; 2017 PT Warta Milenial Indonesia | <a>Term of Use</a> | <a>Privacy</a>
            </el-col>
            <el-col :span="12" style="text-align: right">
              <a>Sitemap</a> | <a>Contact Us</a>
            </el-col>
          </el-row>
          </div>
        </div>
    </el-footer>
</template>

<script>
export default {
  data() {
    return {
      fshare: [
        { id: 1, name: 'facebook', icon: 'facebook', url: '' },
        { id: 2, name: 'twitter', icon: 'twitter', url: '' },
        { id: 3, name: 'instagram', icon: 'instagram', url: '' },
        { id: 4, name: 'youtube', icon: 'play', url: '' }
      ],
      fnav: [
        { id: 1, name: 'Home', url: '' },
        { id: 2, name: 'Tentang Kami', url: '' },
        { id: 3, name: 'Kontak', url: '' },
        { id: 4, name: 'Aturan', url: '' },
        { id: 5, name: 'Privasi', url: '' },
        { id: 6, name: 'Cara Menulis di Berita Baik', url: '' },
        { id: 7, name: 'Pedoman', url: '' }
      ]
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

.footer-wrapper{
  &-s1{
    background-color: #333;
    padding: 20px 0;
    color: #FEFEFE;
    font-weight: 700;

    a{
      padding: 0 20px;
    }
  }
  &-s2{
    background-color: #1A1A1A;
    padding: 10px 0;
    color: #666;
    font-size: 0.8em;
    a:hover{
      color: #ccc;
    }
  }
}


</style>