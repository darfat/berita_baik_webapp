<template>
  <div>
    <el-row :gutter="10" type="flex" align="middle" justify="space-between" class="hd-content">
        <el-col :span="9" class="hd-logo">
          <router-link :to="{ name: 'Home' }" ><img class="" :src="img_logo" alt="beritabaik.id"></router-link>
        </el-col>
        <el-col :span="8" class="hd-srch">
          <search-box></search-box>          
        </el-col>
        <el-col :span="4" class="hd-write">
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
        </el-col>
        <el-col :span="3" class="hd-user">
          <router-link :to="{ name: 'public-login' }" v-if="!name">Log In / Sign Up</router-link>
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
                <img v-else class="user-avatar" src="/static/images/avatar/no_avatar.png" style="border-radius:50%">
              </el-button>
            </div>
          </div>
        </el-col>
      </el-row>      
  </div>
</template>

<script>
import img_logo from '@/assets/images/logo_berita_baik.png'
import SearchBox from '@/views/portal/components/SearchBox'
import { mapGetters } from 'vuex'
export default {
  name: 'HeaderOnSm',
  components: { SearchBox },
  data() {
    return {
      img_logo,
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