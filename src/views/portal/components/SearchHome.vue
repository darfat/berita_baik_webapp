<template>
    <div class="search">
        <div class="container">
            <div class="search-box">
                <span class="search-box-label">Pencarian</span>                
                <el-input placeholder="Pencarian" v-model="input1" class="">
                <el-button slot="append" icon="el-icon-search"></el-button>
                </el-input>             
            </div>
            <div class="search-result">

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
        width: 10%;
        color: $bb-blue;
        font-size: 1.5em;
        display: inline-block;
        background-color: aqua;
      }
      .el-input{        
        
        
      }
    }    
}
</style>