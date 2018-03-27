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
      <el-row>
        <el-col :xs="24" :sm="10">
          <div class="head-item">
            <div class="head-item-img">
              <img class="" :src="img_logo" alt="beritabaik.id">
            </div>
          </div>
        </el-col>
        <el-col :xs="16" :sm="6">
          <div class="head-item">
            <div class="head-item-search">            
              <el-input placeholder="Search" suffix-icon="el-icon-search" v-model="search"></el-input>
            </div>
          </div>
        </el-col>
        <el-col :xs="4" :sm="4">
          <div class="head-item">
            <div class="head-item-contribute">
                  <el-button icon="el-icon-edit" class="main-button" >Tulis Berita Baik</el-button>
            </div>
          </div>
        </el-col>
        <el-col :xs="4" :sm="2">
          <div class="head-item">
            <div class="head-item-lang">
            <el-dropdown>
              <span class="el-dropdown-link">
                Bahasa<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Indonesia</el-dropdown-item>
                <el-dropdown-item>English</el-dropdown-item>           
              </el-dropdown-menu>
            </el-dropdown>
            </div>
          </div>
        </el-col>
        <el-col :xs="4" :sm="2">
          <div class="head-item">
            <div class="head-item-user">
            <!-- <el-dropdown class="avatar-container" >
              <div class="avatar-wrapper">
              <img class="user-avatar" src="">
              <i class="el-icon-caret-bottom"></i>
              </div>
              <el-dropdown-menu class="user-dropdown" slot="dropdown">
              <router-link class="inlineBlock" to="/">
              <el-dropdown-item>
                Home
              </el-dropdown-item>
              </router-link>
              <el-dropdown-item divided>
              <span style="display:block;">LogOut</span>
              </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown> -->
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <sticky className="sticky" height="100">
      <div class="menu-wrapper">
      <nav class="container">
          <div id="logo" v-if="scrolled > 50"><img class="" :src="img_ikon_mono" alt="beritabaik.id"></div>
          <label for="drop" class="toggle"><svg-icon icon-class="Hamburger" class="hamburger-menu"></svg-icon></label>
          <input type="checkbox" id="drop" />          
              <ul class="menu">
                  <li :class="scrolled > 100 ? 'home-hide': 'home'"><router-link :to="{ path: '/' }" exact>{{$t('portal.navbar.home')}}</router-link></li>
                  <li><router-link :to="{ path: '/home/indonesia-baik' }">Indonesia Baik</router-link></li>
                  <li>
                      <!-- First Tier Drop Down -->
                      <label for="drop-1" class="toggle">Indonesia Bangga &#9660;</label>
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
                  <label for="drop-2" class="toggle">Melancong &#9660;</label>
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
                  <label for="drop-3" class="toggle">Panggung &#9660;</label>
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
                  <label for="drop-4" class="toggle">Citra &#9660;</label>
                  <router-link :to="{ path: '/home-m/gallery' }">Citra</router-link>
                  <input type="checkbox" id="drop-4"/>
                  <ul>
                      <li><router-link :to="{ path: '/home-m/gallery' }">Galeri Foto</router-link></li>
                      <li><router-link :to="{ path: '/home-m/video' }">Video</router-link></li>
                      <li><router-link :to="{ path: '/home-m/infografis' }">Infografis</router-link></li>
                  </ul>
                  </li>
                  <li>
                    <div class="social-media-container">
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
import img_logo from '@/assets/images/logo_berita_baik.png'
import img_ikon from '@/assets/images/ikon_berita_baik.png'
import img_ikon_mono from '@/assets/images/ikon_berita_baik_white.png'
import img_logo_mono from '@/assets/images/logo_berita_baik_white.png'
export default {
  name: 'HomeHeader',
  components: { Sticky },
  data() {
    return {
      img_logo,
      img_logo_mono,
      img_ikon,
      img_ikon_mono,
      search: '',
      scrolled: null
    }
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

@import "src/styles/variables.scss";

.el-header{  
  margin: 0; padding: 0;  background-color: #FFF; 
}
/*
  top navigation ok
*/
.topnav-wrapper {
  background-color : $main-blue;
  .el-menu{
    background-color: transparent;
    border: none;    
    &-item{
      color: white;
      float: right;
      line-height: 18px;
      height: 24px;
      white-space: nowrap;
      @media (min-width: 320px) and (max-width: 480px) {
        font-size: 12px;
        line-height: 12px;
      }      
      &:hover{        
        color: $blue-1;
        background-color: transparent;
      }
    }
  }
}

/********************
  logo beritabaik.id
  search form
  lang select
  user/member area 
**********************/
.head{  
  &-wrapper {
    // height: 100px;    
  }
  &-item{    
    //height: 100px;
    &-img{       
      img{        
        max-width: 100%;
        height: auto;
        margin: 25px 0;
      }
    }
    &-search{
      padding: 30px 10%;
    }
    &-lang{
      padding: 30px 0;
    }
    &-contribute{
      padding: 30px 0;
    }
    &-user{
      padding: 30px 0;
    }
  }
}

.menu-wrapper {
  background-color: $main-red;  
  padding: 0;
  margin: 0;
  z-index: 2;
  //border-bottom: 2px solid $main-red;
  position: relative;
}

.toggle,
[id^=drop] {
	display: none;
}

nav a.router-link-active {  
  color: $bb-white;
  border-bottom: 2px solid $bb-white-menu;
  // background-color: rgba($color: $bb-white, $alpha: 0.1)
}

/* Giving a background-color to the nav container. */
nav {
  font-size: 14px;
  position: relative; 
}

#logo {
	display: block;	
	float: left;
  padding-top: 9px;
  padding-right: 9px;  
}

#logo img{
  height: 30px;  
}

.social-media-container{
  color: $bb-white-menu;
  padding-top: 10px;
  padding-right: 10px;
  float: right;
  a{
    padding: 0 5px 0 0;
    display: inline;
    .icon{
      width: 25px;
      height: 25px;
      border-radius: 50%;
      padding: 3px;
      border: 2px solid $bb-white-menu;  
    }
  }  
}


/* Since we'll have the "ul li" "float:left"
 * we need to add a clear after the container. */

nav:after {
	content: "";
	display: table;
	clear: both;
}

/* Removing padding, margin and "list-style" from the "ul",
 * and adding "position:reltive" */
nav ul {
	// float: right;
	padding: 0;
	margin: 0;
	list-style: none;
  position: relative;
  z-index: 2;
	}
	
/* Positioning the navigation items inline */
nav ul li {
	margin: 0;
	display: inline-block;
	float: left;
	background-color: $main-red;
  font-weight: 700;
	}

/* Styling the links */
nav a {
	display: block;
	padding: 14px 8px;	
	color: $bb-white-menu;
  // border-bottom: 2px solid $main-red;  
}
nav ul li ul li:hover { color: white; }

/* Background color change on Hover */
nav a:hover {
  border-bottom: 2px solid $bb-white-menu;
  color: $bb-white;
}

/* Hide Dropdowns by Default
 * and giving it a position of absolute */
nav ul ul {
	display: none;
	position: absolute; 
	/* has to be the same number as the "line-height" of "nav a" */
	top: 46px; 
}
	
/* Display Dropdowns on Hover */
nav ul li:hover > ul {
	display: inherit;
}
	
/* Fisrt Tier Dropdown */
nav ul ul li {
	width: 170px;
	float: none;
	display: list-item;
	position: relative;
}

/* Second, Third and more Tiers	
 * We move the 2nd and 3rd etc tier dropdowns to the left
 * by the amount of the width of the first tier.
*/
nav ul ul ul li {
	position: relative;
	top: -60px;
	/* has to be the same number as the "width" of "nav ul ul li" */ 
	left: 170px; 
}

	
/* Change ' +' in order to change the Dropdown symbol */
li > a:after { content:  ' \25BC'; color: $bb-white-menu; }
li > a:only-child:after { content: ''; }

.menu >li:last-child{
  float:right;
}
/* Media Queries
--------------------------------------------- */

@media all and (max-width : 768px) {

	#logo {
		// display: block;
		// padding: 0;
		// width: 100%;
		// text-align: center;
		// float: none;
	}

.hamburger-menu{
    float: right;
    text-align: right;    
  }

	nav {
		margin: 0;
    padding-top: 0;
    padding-bottom: 3px;
    min-height: 44px;
	}

	/* Hide the navigation menu by default */
	/* Also hide the  */
	.toggle + a,
	.menu {
		display: none;
	}

	/* Stylinf the toggle lable */
	.toggle {
		display: block;
		//background-color: $red-1;
		padding: 8px 10px;	
		color: $bb-white-menu;
		text-decoration: none;
		border: none;
	}

	.toggle:hover {
		//background-color: $red-1;
	}

	/* Display Dropdown when clicked on Parent Lable */
	[id^=drop]:checked + ul {
		display: block;
	}

	/* Change menu item's width to 100% */
	nav ul li {
		display: block;
		width: 100%;
		}

	nav ul ul .toggle,
	nav ul ul a {
		padding: 0 40px;
	}

	nav ul ul ul a {
		padding: 0 80px;
	}

	nav a:hover,
 	nav ul ul ul a {
		border: none;
    text-decoration: none;
	}
  
	nav ul li ul li .toggle,
	nav ul ul a,
  nav ul ul ul a{
		padding: 8px 20px;	
		color: $bb-white-menu;
	}
  
  
	nav ul li ul li .toggle,
	nav ul ul a {
		text-decoration: none;
	}

	/* Hide Dropdowns by Default */
	nav ul ul {
		float: none;
		position: static;
		color: #ffffff;
		/* has to be the same number as the "line-height" of "nav a" */
	}
		
	/* Hide menus on hover */
	nav ul ul li:hover > ul,
	nav ul li:hover > ul {
		display: none;
	}
		
	/* Fisrt Tier Dropdown */
	nav ul ul li {
		display: block;
		width: 100%;
	}

	nav ul ul ul li {
		position: static;
		/* has to be the same number as the "width" of "nav ul ul li" */ 

	}

  

}

@media all and (max-width : 330px) {
  .container{
    // margin: 0; padding: 0;
  }
  nav{
    font-size: 12px;
    padding-top: 10px;
  }
	nav ul li {
		display: block;
		width: 94%;    
	}

}

.svg-icon{
  font-size: 20px;
  font-weight: 700;  
}

.main-button{
  background-color: $main-blue;
  color: $bb-white-menu;
}

.home-hide{
  display: none;
}
</style>