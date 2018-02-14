<template>
<div id="header">

  <div class="topnav-container">
    <el-menu class="container" mode="horizontal">
      <el-menu-item index="1"><a>Kerjasama</a></el-menu-item>
      <el-menu-item index="2"><a>Mail</a></el-menu-item>
      <el-menu-item index="3"><a>Tentang Kami</a></el-menu-item>
    </el-menu>
  </div>

  <div class="head-container">
    <el-row class="container">
      <el-col :span="12">
        <div class="head-logo">
          <img class="head-logo-img" :src="img_logo" alt="beritabaik.id">
        </div>
      </el-col>
      <el-col :span="8" class="hidden-sm-and-down">
        <div class="head-search">          
          <el-input placeholder="Search" suffix-icon="el-icon-search" v-model="search"></el-input>
        </div>
      </el-col>
      <el-col :span="2" class="hidden-sm-and-down">
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
            <img class="user-avatar" :src="avatar+'?imageView2/1/w/80/h/80'">
            <i class="el-icon-caret-bottom"></i>
            </div>
            <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link class="inlineBlock" to="/">
            <el-dropdown-item>
              Home
            </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
            <span @click="logout" style="display:block;">LogOut</span>
            </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>

</div>
</template>

<script>
<<<<<<< HEAD
import { mapGetters } from 'vuex'
import img_logo from '@/assets/images/logo_beritabaik.png'

export default {
  data() {
    return {
      img_logo,
      search: '',
    }
  },
  computed: {
    message() {
      return 'msg'
    },
    ...mapGetters([    
      'avatar'
    ])
  },
  methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
}
=======
// import img_404 from '@/assets/404_images/logo_beritabaik.png'
>>>>>>> 2214c6eacdbe958d3e288a7ca74787ee1d1b4377
console.log('Header part')
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

@import "src/styles/home.scss";

.el-header{
  padding:0;  
  width: 100%;
}

/*
  top navigation
*/
.topnav-container {
  background-color : $bb-blue; 
  
  .el-menu{
    background-color: transparent;      
    border: none; 
    
    &-item{
      color:ghostwhite;
      height: 40px;
      line-height: 40px;       
      float: right;
      position: relative;        
      text-align: right;

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
.head-container {  
  //background-color: aquamarine;  
  .container{
    display: flex;
    align-items: center;
    //background-color: aqua;

    .head-logo{
      //background-color: blue;
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


@media (min-width: 320px) and (max-width: 480px) {
  
  .topnav-container {       
    .el-menu{      
      &-item{
        font-size: 12px;
      }
    }    
  }
      
}


</style>



