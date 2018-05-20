<template>
<div class="profile-wrapper">
    <el-row :gutter="20" class="profile-header">
      <div class="container">
        <div class="img-cover"></div>
        <div class="img-profile"></div>
        <div class="name"></div>
        <div class="edit-btn"></div>
        <div class="pos"></div>
        <div class="following"></div>
        <div class="menu"></div>
      </div>
    </el-row>
    <el-row :gutter="20" class="profile-content">
      <div class="container">
      STORY
      KOMENTAR
      MENYUKAI
      > BLANK
      -icon-buku
      Belum ada story
      User ini belum membuat ceritamu sendiri
      <button>BUAT CERITA</button>
      </div>
    </el-row>
    <el-row :gutter="20" class="profile-other-content">
      <div class="container">
      -berita terbaru
      -berita terpolular
      -event
      </div>
    </el-row>    
</div>
</template>
<script>
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/profile.scss";
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 20px;
  }
  &:firts-child {
    // margin-top: 20px;
  }
}
.el-col {
    border-radius: 0px;
}
</style>