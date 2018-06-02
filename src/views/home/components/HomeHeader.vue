<template>
    <el-header height="auto" >
      
    <div class="topnav-wrapper">
      <div class="container">
        <el-row :gutter="10" type="flex" align="middle" justify="end" class="topnav-content">
          <el-col :span="20">
            <a href="#"><router-link :to="{ name: 'tentang-kami-menu' }">{{$t('portal.topbar.aboutUs')}}</router-link></a>
            <a href="#"><svg-icon icon-class="envelop"></svg-icon>&nbsp;{{$t('portal.topbar.beritabaik_mail_account')}}</a>
            <a href="#"><router-link :to="{ name: 'kerjasama-menu' }">{{$t('portal.topbar.collaboration')}}</router-link></a>
          </el-col>        
        </el-row>
      </div>     
    </div>
    
    <div class="hd-wrapper container">
      <home-header-xs class="hidden-sm-and-up"></home-header-xs>
      <home-header-sm class="hidden-xs-only"></home-header-sm>
    </div>
    <sticky className="sticky" height="100">
      <div class="menu-wrapper">
      <nav class="container">
          <div id="logo" v-if="scrolled > 50">
                <router-link :to="{ path: '/' }" exact><img class="" :src="img_ikon_mono" alt="beritabaik.id"></router-link>
          </div>
          <transition name="el-fade-in-linear">
          <label for="drop" class="toggle" v-if="!show" @click="show = !show"><svg-icon icon-class="menu" class="hamburger-menu"></svg-icon></label>
          <label for="drop" class="toggle" v-else @click="show = !show"><svg-icon icon-class="cross" class="cross-menu"></svg-icon></label>
          </transition>
          <input type="checkbox" id="drop" :checked=" show ? 'checked' : '' " />          
              <ul class="menu">
                  <!--<li :class="scrolled > 100 ? 'home-hide': 'home'"><router-link :to="{ path: '/' }" exact>{{$t('portal.navbar.home')}}</router-link></li>-->
                  <li @click="show = !show"><router-link :to="{ path: '/home/indonesia-baik' }">Indonesia Baik</router-link></li>
                  <li>
                      <!-- First Tier Drop Down -->
                      <label for="drop-1" class="toggle">Indonesia Bangga <span class="arrow">&#9660;</span></label>
                      <router-link :to="{ path: '/home/p/indonesia-bangga' }">Indonesia Bangga</router-link>
                      <input type="checkbox" id="drop-1"/>
                      <ul>
                          <li @click="show = !show"><router-link :to="{ path: '/home/komunitas' }">Komunitas</router-link></li>
                          <li @click="show = !show"><router-link :to="{ path: '/home/sosok-inspiratif' }">Sosok Inspiratif</router-link></li>
                          <li @click="show = !show"><router-link :to="{ path: '/home/prestasi' }">Prestasi</router-link></li>
                      </ul>
                  </li>
                  <li @click="show = !show"><router-link :to="{ path: '/home/indonesia-membangun' }">Indonesia Membangun</router-link></li>
                  <li>
                  <!-- First Tier Drop Down -->
                  <label for="drop-2" class="toggle">Melancong <span class="arrow">&#9660;</span></label>
                  <router-link :to="{ path: '/home/p/melancong' }">Melancong</router-link>
                  <input type="checkbox" id="drop-2"/>
                  <ul>
                      <li @click="show = !show"><router-link :to="{ path: '/home/tempat-wisata' }">Tempat Wisata</router-link></li>
                      <li @click="show = !show"><router-link :to="{ path: '/home/kuliner' }">Kuliner</router-link></li>                    
                  </ul>
                  </li>
                  <li @click="show = !show"><router-link :to="{ path: '/home/teknologi' }">Teknologi</router-link></li>
                  <li>
                  <!-- First Tier Drop Down -->
                  <label for="drop-3" class="toggle">Panggung <span class="arrow">&#9660;</span></label>
                  <router-link :to="{ path: '/home/p/panggung' }">Panggung</router-link>
                  <input type="checkbox" id="drop-3"/>
                  <ul>
                      <li @click="show = !show"><router-link :to="{ path: '/home/musik' }">Musik</router-link></li>
                      <li @click="show = !show"><router-link :to="{ path: '/home/fashion' }">Fashion</router-link></li>
                      <li @click="show = !show"><router-link :to="{ path: '/home/film' }">Film</router-link></li>
                      <li @click="show = !show"><router-link :to="{ path: '/home/seni' }">Seni</router-link></li>
                      <li @click="show = !show"><router-link :to="{ path: '/home/gaya-hidup' }">Gaya Hidup</router-link></li>
                  </ul>
                  </li>
                  <li>
                  <!-- First Tier Drop Down -->
                  <label for="drop-4" class="toggle">Citra <span class="arrow">&#9660;</span></label>
                  <router-link :to="{ path: '/home-c/gallery-foto' }">Citra</router-link>
                  <input type="checkbox" id="drop-4"/>
                  <ul>
                      <li @click="show = !show"><router-link :to="{ path: '/home-c/gallery-foto' }">Galeri Foto</router-link></li>
                      <li @click="show = !show"><router-link :to="{ path: '/home-g/video' }">Video</router-link></li>
                      <li @click="show = !show"><router-link :to="{ path: '/home-c/infografis' }">Infografis</router-link></li>
                  </ul>
                  </li>
                  <li>
                    <label for="drop-5" class="toggle">More <span class="arrow">&#9660;</span></label>
                    <router-link :to="{ path: '/home-m/event-calendar' }">More</router-link>
                    <input type="checkbox" id="drop-5"/>
                    <ul>
                        <li @click="show = !show"><router-link :to="{ path: '/home-m/event-calendar' }">Acara</router-link></li>
                        <li @click="show = !show"><router-link :to="{ path: '/home-c/foto-kamu' }">Foto Kamu</router-link></li>
                        <li @click="show = !show"><router-link :to="{ path: '/home/berita-kamu' }">Berita Kamu</router-link></li>
                    </ul>
                  </li>
                  <li>
                    <div class="social-media-container" :class="scrolled > 50 ? 'home-hide': 'home'">
                      <a href="https://www.facebook.com/beritabaik.id/" target="_blank"><fa-icon name="facebook" scale="1" class="icon" ></fa-icon></a>
                      <a href="https://twitter.com/beritabaik_id" target="_blank"><fa-icon name="twitter" scale="1" class="icon" ></fa-icon></a>
                      <a href="https://www.instagram.com/beritabaik.id/" target="_blank"><fa-icon name="instagram" scale="1" class="icon" ></fa-icon></a>
                      <a href="https://www.youtube.com/channel/UCMhqsN7csDXMaJCIvt3s0BQ?view_as=subscriber" target="_blank"><fa-icon name="youtube-square" scale="1" class="icon" ></fa-icon></a>
                    </div> 
                  </li>               
              </ul>
                           
          </nav>    
          
        </div>
      </sticky> 
    </el-header>
  
</template>

<script>
import Sticky from '@/components/Sticky'
import SearchBox from '@/views/portal/components/SearchBox'
import HomeHeaderXs from '@/views/home/components/HomeHeaderXs'
import HomeHeaderSm from '@/views/home/components/HomeHeaderSm'
import img_logo from '@/assets/images/logo_berita_baik.png'
import img_ikon from '@/assets/images/ikon_berita_baik.png'
import img_ikon_mono from '@/assets/images/ikon_berita_baik_white.png'
import img_logo_mono from '@/assets/images/logo_berita_baik_white.png'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeHeader',
  components: { Sticky, SearchBox, HomeHeaderXs, HomeHeaderSm },
  data() {
    return {
      img_logo,
      img_logo_mono,
      img_ikon,
      img_ikon_mono,
      search: '',
      scrolled: null,
      visible: false,
      show: false,
      sshow: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'role',
      'image'
    ])
  },
  methods: {
    handleScroll() {
      this.scrolled = window.scrollY
    }
  },
  created() {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed() {
    window.removeEventListener('scroll', this.handleScroll)
  }
}

// console.log('Header part')
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/home-header.scss";
.el-row {
  margin-bottom: 0;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 0;
}
.sticky{
  transition: all 0.4s ease;
}
</style>