<template>
<el-header>

  <div class="topnav-container">
    <el-menu mode="horizontal">
      <el-menu-item index="1"><a>Kerjasama</a></el-menu-item>
      <el-menu-item index="2"><a>Mail</a></el-menu-item>
      <el-menu-item index="3"><a>Tentang Kami</a></el-menu-item>
    </el-menu>
  </div>

  <div class="head-container">
    <el-row>
      <el-col :span="6">
        <div class="head-logo">
          <img src="/assets/images/logo_beritabaik.png" alt="beritabaik.id">
        </div>
      </el-col>
      <el-col :span="6"><div class="head-search">search</div></el-col>
      <el-col :span="6"><div class="head-lang">lang</div></el-col>
      <el-col :span="6"><div class="head-user">user</div></el-col>
    </el-row>
  </div>

</el-header>
</template>

<script>
// import img_404 from '@/assets/404_images/logo_beritabaik.png'
console.log('Header part')
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/home.scss";

.el-header{
  padding: 0;
}

/*
  top navigation
*/
.topnav-container {    
  background-color : $bb-blue;    
  font-size: 12px;
  font-weight: normal;
  padding: 0 20px;
  
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
  padding: 0 20px;
}


</style>



