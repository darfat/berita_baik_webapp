<template>
  <!--<scroll-bar>-->
  <el-scrollbar wrapClass="scrollbar-wrapper">      
    <div class="logo">      
      <router-link :to="{ name: 'Home' }" exact>
        <img :src="img_logo_mono" v-if="!isCollapse" class="logo-f">
        <img :src="img_ikon_mono" class="logo-i" v-else>
      </router-link>
    </div>
    <div class="user">
       <span v-if="image">
        <img :src="image" v-if="!isCollapse">
        <img :src="image" v-else>
       </span>
       <span v-else>
        <img src="/static/images/avatar/m01.png" v-if="!isCollapse">
        <img src="/static/images/avatar/m01.png" v-else>
       </span>
    </div>    
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" >
      <sidebar-item :routes="permission_routers"></sidebar-item>
    </el-menu>
  </el-scrollbar>
  <!--</scroll-bar>-->
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'
import img_logo from '@/assets/images/logo_berita_baik.png'
import img_ikon from '@/assets/images/ikon_berita_baik.png'
import img_ikon_mono from '@/assets/images/ikon_berita_baik_white.png'
import img_logo_mono from '@/assets/images/logo_berita_baik_white.png'

export default {
  components: { SidebarItem, ScrollBar },
  data() {
    return {
      img_logo,
      img_logo_mono,
      img_ikon,
      img_ikon_mono
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'permission_routers',
      'image'
    ]),
    // routes() {
    //   return this.$router.options.routes
    // },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.logo{
  background-color: $main-blue;
  margin: 0;
  padding: 10px 15px 10px 15px;
  //border-bottom : 1px solid #e6e6e6;
  img{
    width: 100%;
    // height: 39px;
  }
}

.user{  
  margin: 20px 0;
  padding: 0 10px;  
  text-align: center;
  img{
    width: 160px;
    border-radius: 50%;
  }
}
.hideSidebar {
  .logo{
    padding: 10px 5px;
    border-bottom : 1px solid #e6e6e6;
    img{
      width: 26px;      
    }
  }

  .user{
    padding: 10px 5px;    
    img{
      width: 26px;      
    }
  }
}

.logout{
  color: white;
}
</style>