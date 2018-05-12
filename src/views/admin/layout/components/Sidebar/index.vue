<template>
  <!--<scroll-bar>-->
  <el-scrollbar wrapClass="scrollbar-wrapper">      
    <div class="logo">      
      <img src="static/images/logo_beritabaik.png" v-if="!isCollapse">
      <img src="static/images/logo_beritabaik_b_.png" v-else>
    </div>
    <div class="user">
      <img src="static/images/avatar/m01.png" v-if="!isCollapse">
      <img src="static/images/avatar/m01.png" v-else>
    </div>    
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" >
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </el-scrollbar>
  <!--</scroll-bar>-->
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.logo{
  background-color: white;
  margin: 0;
  padding: 0 10px;
  border-bottom : 1px solid #e6e6e6;
  img{
    width: 160px;
  }
}

.user{  
  margin: 20px 0;
  padding: 0 10px;  
  img{
    width: 160px;
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