<template>
  <div class="search">
      <div class="container">
        <div class="search-box">
          <el-row>
            <el-col :span="4" class="search-box-label">
              Pencarian
            </el-col>
            <el-col :span="20" class="search-box-input">
              <el-input placeholder="Pencarian" v-model="input1" class="">
              <el-button slot="append" icon="el-icon-search"></el-button>
              </el-input>
            </el-col>
          </el-row>
          <el-row style="margin-top: 10px;">
            <el-col :span="4">
              &nbsp;  
            </el-col>
            <el-col :span="14" class="search-box-result">
              117 Artikel | Halaman 1 dari 6                
            </el-col>
            <el-col :span="6" class="search-box-advanced">
              <a href="#/search-advanced">Opsi Lanjutan +</a>
            </el-col>
          </el-row>                         
        </div>
        <div class="search-result">
          <el-row :gutter="20">
            <el-span :md="8" v-for="n in 9">
              <div style="display: block; width:100%; height: 100px; background-color: #0f0">{{n}}</div>
            </el-span>
          </el-row>
        </div>
        <div class="search-pagination">

        </div>
      </div>    
  </div>
</template>

<script>

export default {
  name: 'SearchHome',
  data() {
    return {
      input1: '',
      videoId: 'PHs39R0AbRw',
      videoTitle: '5 Destinasi Wisata Terbaik di Jawa Barat',
      idata: [{
        id: 1,
        vid: 'PHs39R0AbRw',
        vidTitle: 'Title Video'
      },
      {
        id: 2,
        vid: 'PHs39R0AbRw',
        vidTitle: 'Title Video'
      },
      {
        id: 3,
        vid: 'PHs39R0AbRw',
        vidTitle: 'Title Video'
      },
      {
        id: 4,
        vid: 'PHs39R0AbRw',
        vidTitle: 'Title Video'
      },
      {
        id: 5,
        vid: 'PHs39R0AbRw',
        vidTitle: 'Title Video'
      },
      {
        id: 6,
        vid: 'PHs39R0AbRw',
        vidTitle: 'Title Video'
      }]
    }
  },
  created() {
    console.log('searchhome')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.search{
  padding: 40px 0;
  background-color: $bb-gray;
  &-box{
    &-label{
      color: $bb-blue;
      font-size: 1.5em;
      line-height: 1.6em;
      font-weight: 700;
      text-align: center;        
    }
    &-advanced{
      color: $bb-blue;
      text-align: right;
    }
  }

  &-result{
    width: 100%;
    min-height: 400px;
    background-color: #fff;
    margin: 20px 0;
  }
}
</style>