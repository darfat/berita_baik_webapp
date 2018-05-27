<template>
    <el-header height="auto" >
      
    <div class="topnav-wrapper">
      <el-menu class="container" mode="horizontal">   
        <el-menu-item index="1"><a href="#">{{$t('portal.topbar.collaboration')}}</a></el-menu-item>
        <el-menu-item index="2"><fa-icon name="envelope" scale="1" ></fa-icon><span>&nbsp;{{$t('portal.topbar.beritabaik_mail_account')}}</span></el-menu-item>
        <el-menu-item index="3"><a href="#">{{$t('portal.topbar.aboutUs')}}</a></el-menu-item>
      </el-menu>
    </div>

    <div class="head-wrapper container">      
      <el-row :gutter="10">
        <el-col :xs="24" :sm="8">
          <div class="head-item mc">
            <div class="head-item-img mc-content">
              <a href="#/home" title="beritabaik.id" ><img class="" :src="img_logo" alt="beritabaik.id"></a>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :sm="9">
          <div class="head-item mc">
            <div class="head-item-search mc-content">
              <!-- <el-input placeholder="Search" suffix-icon="el-icon-search" v-model="search" v-on:keyup.enter="onEnterClick" ></el-input> -->
              <search-box></search-box>
            </div>
          </div>
        </el-col>
        <el-col :xs="12" :sm="4">
          <div class="head-item mc">
            <div class="head-item-contribute mc-content">
                <span v-if="name">
                <router-link v-if="name && role === 'public'" :to="{ name: 'back-public-article-form', params: { editorialSlug:'berita-kamu', articleType:'y-news' } }">
                  <el-button icon="el-icon-edit" class="main-button" >Tulis Berita Baik</el-button>
                </router-link>
                <router-link v-if="name && role === 'editor'" :to="{ name: 'Dashboard'}">
                  <el-button icon="el-icon-news" class="main-button" >CMS</el-button>
                </router-link>
                </span>
                <router-link v-else :to="{ name: 'public-login' }">
                  <el-button icon="el-icon-edit" class="main-button" >Tulis Berita Baik</el-button>
                </router-link>
            </div>
          </div>
        </el-col>        
        <el-col :xs="12" :sm="3">
          
          <div class="head-item mc">            
            <div class="head-item-user mc-content">              
              <a href="#/login" v-if="!name">Log In / Sign Up</a>              
              <div class="avatar-container" v-else>
                <!-- <small v-if="name"> Hi, {{name}} </small> -->
                <div class="avatar-wrapper">
                  <!--<img class="user-avatar" src="static/images/avatar/no_avatar.png">-->
                  <el-popover
                    ref="refuser"
                    placement="bottom"                    
                    trigger="click"
                    v-model="visible">
                    <div class="user-menu">
                      <div class="user-menu-item">
                        <router-link :to="{ name: 'editProfile' }">
                          <fa-icon name="user-circle-o" scale="1.6"></fa-icon> Profil Saya
                        </router-link>
                      </div>
                      <div class="user-menu-item">
                        <router-link :to="{ name: 'admin-logout' }">
                          <fa-icon name="power-off" scale="1.6"></fa-icon> Keluar
                        </router-link>
                      </div>
                    </div>                    
                  </el-popover>
                  <el-button v-popover:refuser>
                    <img v-if="image" class="user-avatar" :src="image" style="border-radius:50%">
                    <img v-else class="user-avatar" src="static/images/avatar/no_avatar.png" style="border-radius:50%">
                  </el-button>
                </div>
              </div>  
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <sticky className="sticky" height="100">
      <div class="menu-wrapper">
      <nav class="container">
          <div id="logo" v-if="scrolled > 50">
                <router-link :to="{ path: '/' }" exact><img class="" :src="img_ikon_mono" alt="beritabaik.id"></router-link>
          </div>
          <label for="drop" class="toggle"><svg-icon icon-class="Hamburger" class="hamburger-menu"></svg-icon></label>
          <input type="checkbox" id="drop" />          
              <ul class="menu">
                  <!--<li :class="scrolled > 100 ? 'home-hide': 'home'"><router-link :to="{ path: '/' }" exact>{{$t('portal.navbar.home')}}</router-link></li>-->
                  <li><router-link :to="{ path: '/home/indonesia-baik' }">Indonesia Baik</router-link></li>
                  <li>
                      <!-- First Tier Drop Down -->
                      <label for="drop-1" class="toggle">Indonesia Bangga <span class="arrow">&#9660;</span></label>
                      <router-link :to="{ path: '/home/p/indonesia-bangga' }">Indonesia Bangga</router-link>
                      <input type="checkbox" id="drop-1"/>
                      <ul>
                          <li><router-link :to="{ path: '/home/komunitas' }">Komunitas</router-link></li>
                          <li><router-link :to="{ path: '/home/sosok-inspiratif' }">Sosok Inspiratif</router-link></li>
                          <li><router-link :to="{ path: '/home/prestasi' }">Prestasi</router-link></li>
                      </ul>
                  </li>
                  <li><router-link :to="{ path: '/home/indonesia-membangun' }">Indonesia Membangun</router-link></li>
                  <li>
                  <!-- First Tier Drop Down -->
                  <label for="drop-2" class="toggle">Melancong <span class="arrow">&#9660;</span></label>
                  <router-link :to="{ path: '/home/p/melancong' }">Melancong</router-link>
                  <input type="checkbox" id="drop-2"/>
                  <ul>
                      <li><router-link :to="{ path: '/home/tempat-wisata' }">Tempat Wisata</router-link></li>
                      <li><router-link :to="{ path: '/home/kuliner' }">Kuliner</router-link></li>                    
                  </ul>
                  </li>
                  <li><router-link :to="{ path: '/home/teknologi' }">Teknologi</router-link></li>
                  <li>
                  <!-- First Tier Drop Down -->
                  <label for="drop-3" class="toggle">Panggung <span class="arrow">&#9660;</span></label>
                  <router-link :to="{ path: '/home/p/panggung' }">Panggung</router-link>
                  <input type="checkbox" id="drop-3"/>
                  <ul>
                      <li><router-link :to="{ path: '/home/musik' }">Musik</router-link></li>
                      <li><router-link :to="{ path: '/home/fashion' }">Fashion</router-link></li>
                      <li><router-link :to="{ path: '/home/film' }">Film</router-link></li>
                      <li><router-link :to="{ path: '/home/seni' }">Seni</router-link></li>
                      <li><router-link :to="{ path: '/home/gaya-hidup' }">Gaya Hidup</router-link></li>
                  </ul>
                  </li>
                  <li>
                  <!-- First Tier Drop Down -->
                  <label for="drop-4" class="toggle">Citra <span class="arrow">&#9660;</span></label>
                  <router-link :to="{ path: '/home-c/gallery-foto' }">Citra</router-link>
                  <input type="checkbox" id="drop-4"/>
                  <ul>
                      <li><router-link :to="{ path: '/home-c/gallery-foto' }">Galeri Foto</router-link></li>
                      <li><router-link :to="{ path: '/home-g/video' }">Video</router-link></li>
                      <li><router-link :to="{ path: '/home-c/infografis' }">Infografis</router-link></li>
                  </ul>
                  </li>
                  <li>
                    <label for="drop-5" class="toggle">More <span class="arrow">&#9660;</span></label>
                    <router-link :to="{ path: '/home-m/event-calendar' }">More</router-link>
                    <input type="checkbox" id="drop-5"/>
                    <ul>
                        <li><router-link :to="{ path: '/home-m/event-calendar' }">Acara</router-link></li>
                        <li><router-link :to="{ path: '/home-c/foto-kamu' }">Foto Kamu</router-link></li>
                        <li><router-link :to="{ path: '/home/berita-kamu' }">Berita Kamu</router-link></li>
                    </ul>
                  </li>
                  <li>
                    <div class="social-media-container" :class="scrolled > 50 ? 'home-hide': 'home'">
                      <a href="https://www.facebook.com/beritabaik.id/" target="_blank"><fa-icon name="facebook" scale="1" class="icon" ></fa-icon></a>
                      <a href="https://twitter.com/beritabaik_id" target="_blank"><fa-icon name="twitter" scale="1" class="icon" ></fa-icon></a>
                      <a href="https://www.instagram.com/beritabaik.id/" target="_blank"><fa-icon name="instagram" scale="1" class="icon" ></fa-icon></a>
                      <a href="" target="_blank"><fa-icon name="youtube-square" scale="1" class="icon" ></fa-icon></a>
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
import img_logo from '@/assets/images/logo_berita_baik.png'
import img_ikon from '@/assets/images/ikon_berita_baik.png'
import img_ikon_mono from '@/assets/images/ikon_berita_baik_white.png'
import img_logo_mono from '@/assets/images/logo_berita_baik_white.png'
import { mapGetters } from 'vuex'

export default {
  name: 'HomeHeader',
  components: { Sticky, SearchBox },
  data() {
    return {
      img_logo,
      img_logo_mono,
      img_ikon,
      img_ikon_mono,
      search: '',
      scrolled: null,
      status: false,
      visible: false
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
  border-radius: 0px;
}
.sticky{
  transition: all 0.4s ease;
}
</style>