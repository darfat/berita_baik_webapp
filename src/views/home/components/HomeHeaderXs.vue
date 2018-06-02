<template>
  <div>
    <el-row :gutter="10" type="flex" align="middle" justify="space-between" class="hd-content">
        <el-col :span="8" class="hd-logo">
          <a href="#/home" title="beritabaik.id" ><img class="" :src="img_logo" alt="beritabaik.id"></a>
        </el-col>
        <el-col :span="16" class="hd-right">
          <button class="svg-btn" @click="isShow = !isShow"><svg-icon icon-class="search2"></svg-icon></button>
          <span class="p-l-5"></span>
          <span v-if="name">
          <router-link v-if="name && role === 'public'" :to="{ name: 'back-public-article-form', params: { editorialSlug:'berita-kamu', articleType:'y-news' } }">            
            <button class="svg-btn"><svg-icon icon-class="pencil2"></svg-icon></button>
          </router-link>
          <router-link v-if="name && role === 'editor'" :to="{ name: 'Dashboard'}">            
            <button class="svg-btn cms"><svg-icon icon-class="news"></svg-icon>CMS</button>
          </router-link>
          </span>
          <router-link v-else :to="{ name: 'public-login' }">            
            <button class="svg-btn"><svg-icon icon-class="pencil2"></svg-icon></button>
          </router-link>        
          <span class="spacer-l"></span>
          <a href="#/login" v-if="!name" class=""><svg-icon icon-class="user2"></svg-icon></a>
          <div class="avatar-container" v-else>            
            <div class="avatar-wrapper">              
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
        </el-col>
      </el-row>
      <el-row :gutter="10" v-show="isShow">
        <el-col :span="24" class="search-box">
          <search-box></search-box>
        </el-col>
      </el-row>
  </div>
</template>

<script>
import img_logo from '@/assets/images/logo_berita_baik.png'
import SearchBox from '@/views/portal/components/SearchBox'
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderOnXs',
  components: { SearchBox },
  data() {
    return {
      img_logo,
      isShow: false
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles',
      'role',
      'image'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/home-header.scss";
  .el-row {
    margin-bottom: 0;
    &:last-child {
      margin-bottom: 0;
    }
  }
</style>