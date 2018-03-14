<template>
  

    <el-header height="auto" >
      
      <div class="topnav-wrapper">
      <el-menu class="container" mode="horizontal">      
        <el-menu-item index="1"><a href="#">Kerjasama</a></el-menu-item>
        <el-menu-item index="2"><a href="#">Mail</a></el-menu-item>
        <el-menu-item index="3"><a href="#">Tentang Kami</a></el-menu-item>
      </el-menu>
    </div>

    <div class="head-wrapper">
      <el-row class="container">
        <el-col :span="10">
          <div class="head-logo">
            <img class="head-logo-img" :src="img_logo" alt="beritabaik.id">
          </div>
        </el-col>
        <el-col :span="8" class="hidden-sm-and-down">
          <div class="head-search">          
            <el-input placeholder="Search" suffix-icon="el-icon-search" v-model="search"></el-input>
          </div>
        </el-col>
        <el-col :span="4" class="hidden-sm-and-down">
          <div class="head-lang">
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
          </el-col>
        <el-col :span="2" class="hidden-sm-and-down">
          <div class="head-user">
            <el-dropdown class="avatar-container" >
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
            </el-dropdown>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="menu-wrapper">
     <nav class="container">
        <label for="drop" class="toggle">Menu</label>
        <input type="checkbox" id="drop" />
            <ul class="menu">
                <li><router-link :to="{ path: '/' }" exact>Beranda</router-link></li>
                <li><router-link :to="{ path: '/editorial/indonesia-baik' }">Indonesia Baik</router-link></li>
                <li>
                    <!-- First Tier Drop Down -->
                    <label for="drop-1" class="toggle">Indonesia Bangga &#9660;</label>
                    <router-link :to="{ path: '/editorial/p/indonesia-bangga' }">Indonesia Bangga</router-link>
                    <input type="checkbox" id="drop-1"/>
                    <ul>
                        <li><router-link :to="{ path: '/editorial/indonesia-baik/komunitas' }">Komunitas</router-link></li>
                        <li><router-link :to="{ path: '/editorial/indonesia-baik/sosok-inspiratif' }">Sosok Inspiratif</router-link></li>
                        <li><router-link :to="{ path: '/editorial/indonesia-baik/prestasi' }">Prestasi</router-link></li>
                    </ul>
                </li>
                <li><router-link :to="{ path: '/editorial/indonesia-membangun' }">Indonesia Membangun</router-link></li>
                <li>
                <!-- First Tier Drop Down -->
                <label for="drop-2" class="toggle">Melancong &#9660;</label>
                <router-link :to="{ path: '/editorial/p/melancong' }">Melancong</router-link>
                <input type="checkbox" id="drop-2"/>
                <ul>
                    <li><router-link :to="{ path: '/editorial/melancong/tempat-wisata' }">Tempat Wisata</router-link></li>
                    <li><router-link :to="{ path: '/editorial/melancong/kuliner' }">Kuliner</router-link></li>                    
                </ul>
                </li>
                <li><router-link :to="{ path: '/editorial/teknologi' }">Teknologi</router-link></li>
                <li>
                <!-- First Tier Drop Down -->
                <label for="drop-3" class="toggle">Panggung &#9660;</label>
                <router-link :to="{ path: '/editorial/p/panggung' }">Panggung</router-link>
                <input type="checkbox" id="drop-3"/>
                <ul>
                    <li><router-link :to="{ path: '/editorial/panggung/musik' }">Musik</router-link></li>
                    <li><router-link :to="{ path: '/editorial/panggung/fashion' }">Fashion</router-link></li>
                    <li><router-link :to="{ path: '/editorial/panggung/film' }">Film</router-link></li>
                    <li><router-link :to="{ path: '/editorial/panggung/seni' }">Seni</router-link></li>
                    <li><router-link :to="{ path: '/editorial/panggung/gaya-hidup' }">Gaya Hidup</router-link></li>
                </ul>
                </li>
                <li>
                <!-- First Tier Drop Down -->
                <label for="drop-4" class="toggle">Citra &#9660;</label>
                <router-link :to="{ path: '/citra/gallery' }">Citra</router-link>
                <input type="checkbox" id="drop-4"/>
                <ul>
                    <li><router-link :to="{ path: '/citra/gallery' }">Galeri Foto</router-link></li>
                    <li><router-link :to="{ path: '/citra/video' }">Video</router-link></li>
                    <li><router-link :to="{ path: '/citra/infografis' }">Infografis</router-link></li>
                </ul>
                </li>                
            </ul>
        </nav>    
      </div>      
       
    </el-header>
  
</template>

<script>

import img_logo from '@/assets/images/logo_beritabaik.png'
import img_b_logo from '@/assets/images/logo_beritabaik_b.png'
export default {
  name: 'HomeHeader',
  components: '',
  data() {
    return {
      img_logo,
      img_b_logo,
      search: ''
    }
  }
}

// console.log('Header part')
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

@import "src/styles/variables.scss";

.el-header{
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
  position: fixed; 
  transition: background 0.35s ease-out;
  background: transparent;
  z-index: 10000;
  
  
}

/*
  top navigation ok
*/
.topnav-wrapper {
  background-color : $bb-blue; 
  
  .el-menu{
    background-color: transparent;      
    border: none; 
    
    &-item{
      color:white;
      height: 30px;
      line-height: 30px;       
      float: right;      
      text-align: right;
      
      @media (min-width: 320px) and (max-width: 480px) {
        font-size: 12px; 
      }
      
      &:hover{
        background-color: transparent;
        color:gainsboro
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
.head-wrapper {  
  background-color: #FFF;  
  .container{
    display: flex;
    align-items: center;
    //background-color: aqua;

    .head-logo{      
      &-img{
        height: 80px;
      }
    } //.head-logo

    .head-search{
      text-align: right;
    }

    .head-lang{
      text-align: right;
    }

    .head-user{
      text-align: right;
    }

  }
  
}

.menu-logo{  
  
  width: 100%; 
  &-img{    
  height: 30px;
  }
}

.menu-wrapper {
  background-color: $bb-yellow;  
  padding: 0;
  margin: 0;
  
}
nav a.router-link-active {
    font-weight: 700; // Bolds the text.    
}

.toggle,
[id^=drop] {
	display: none;
}

/* Giving a background-color to the nav container. */
nav { 	
	background-color: $bb-yellow;
  
}

#logo {
	display: block;
	padding: 0 30px;
	float: left;
	font-size: 20px;
  // line-height: 60px;
  background-color: #FFF;
}

#logo img{
  height: 44px;
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
	}
	
/* Positioning the navigation items inline */
nav ul li {
	margin: 0;
	display: inline-block;
	float: left;
	background-color: $bb-yellow;
	}

/* Styling the links */
nav a {
	display: block;
	padding: 14px 10px;	
	color: $bb-blue;	
	text-decoration: none;
}


nav ul li ul li:hover { background: $bb-yellow1;}

/* Background color change on Hover */
nav a:hover { 	 
  background-color: $bb-yellow1;
  border-bottom: 2px solid $bb-blue;
}

/* Hide Dropdowns by Default
 * and giving it a position of absolute */
nav ul ul {
	display: none;
	position: absolute; 
	/* has to be the same number as the "line-height" of "nav a" */
	top: 48px; 
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
li > a:after { content:  ' \25BC'; color: $bb-yellow2; }
li > a:only-child:after { content: ''; }


/* Media Queries
--------------------------------------------- */

@media all and (max-width : 768px) {

	#logo {
		display: block;
		padding: 0;
		width: 100%;
		text-align: center;
		float: none;
	}

	nav {
		margin: 0;
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
		background-color: $bb-yellow;
		padding: 14px 10px;	
		color: $bb-blue;
		font-size: 17px;
		text-decoration: none;
		border: none;
	}

	.toggle:hover {
		background-color: $bb-yellow;
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
		background-color: $bb-yellow1;
	}
  
	nav ul li ul li .toggle,
	nav ul ul a,
  nav ul ul ul a{
		padding: 14px 20px;	
		color: $bb-blue;
		font-size: 17px; 
	}
  
  
	nav ul li ul li .toggle,
	nav ul ul a {
		background-color: $bb-yellow1; 
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

	nav ul li {
		display: block;
		width: 94%;
	}

}
</style>