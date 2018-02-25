<template>
  <fixed-header :fixed.sync="isFixed" :threshold=140>
    <el-header height="auto" >
      
      <div class="topnav-wrapper" v-if="!isFixed">
      <el-menu class="container" mode="horizontal">      
        <el-menu-item index="1"><a href="#">Kerjasama</a></el-menu-item>
        <el-menu-item index="2"><a href="#">Mail</a></el-menu-item>
        <el-menu-item index="3"><a href="#">Tentang Kami</a></el-menu-item>
      </el-menu>
    </div>

    <div class="head-wrapper" v-if="!isFixed">
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
      
      <nav class="menu-wrapper">
        <el-menu
        :default-active="activeIndex"
        class="container el-menu-nav"
        mode="horizontal"
        
        background-color="#F5DF00"
        text-color="#0A2F88"
        active-text-color="#0A2F88">
          <el-menu-item index="1">
            <div class="menu-logo" v-if="isFixed">
              <a href="#/home"><img class="menu-logo-img" :src="img_b_logo" alt="beritabaik.id"></a>          
          </div>
          <span v-else><a href="#/home">Home</a></span>
          </el-menu-item>
          <el-menu-item index="2"> <router-link :to="{ path: '/editorial/indonesia-baik' }">Indonesia Baik </router-link> </el-menu-item>
          <el-menu-item index="3"> <router-link :to="{ path: '/editorial/indonesia-membangun' }">Indonesia Membangun</router-link> </el-menu-item>
          <el-menu-item index="4"> <router-link :to="{ path: '/editorial/indonesia-bangga' }">Indonesia Bangga</router-link> </el-menu-item>
          <el-menu-item index="5"> <router-link :to="{ path: '/editorial/melancong' }">Melancong</router-link> </el-menu-item>
          <el-menu-item index="6"> <router-link :to="{ path: '/editorial/teknologi' }">Teknologi</router-link> </el-menu-item>
          <el-menu-item index="7"> <router-link :to="{ path: '/editorial/panggung' }">Panggung</router-link> </el-menu-item>
          <el-menu-item index="8"> <router-link :to="{ path: '/editorial/citra' }">Citra</router-link> </el-menu-item>
        </el-menu>
      </nav>
    </el-header>
  </fixed-header>
</template>

<script>
import img_logo from '@/assets/images/logo_beritabaik.png'
import img_b_logo from '@/assets/images/logo_beritabaik_b.png'
import FixedHeader from 'vue-fixed-header'
export default {
  components: {
    FixedHeader
  },
  data() {
    return {
      isFixed: false,
      img_logo,
      img_b_logo,
      search: '',
      activeIndex: '1'
    }
  }
}

console.log('Header part')
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
  .el-menu-nav{
    color: #FFF;
  }
}


</style>