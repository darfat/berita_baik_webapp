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
          <el-row :gutter="20" >
            <el-col :xs="24" :sm="8" :md="8" :lg="8" :xl="8" v-for="n in 9" :key="n">
              
              <el-card :body-style="{ padding: '0px' }">
              <img src="" class="image">
              <div class="desc">
                  <span><v-icon name="heart" base-class="icon-20"></v-icon> </span>
                  <span><v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                <div class="bottom clearfix">
                  <h2><a>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</a></h2>
                </div>
                <div class="bottom clearfix">
                  <hr align="left" />
                  <span>author</span> | <span>time</span>
                </div>
              </div>
            </el-card>

            </el-col>
          </el-row>
        </div>
        <div class="search-pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="20"
            prev-text="Pertama" next-text="Terakhir"
            >
          </el-pagination>
        </div>
      </div>    
  </div>
</template>

<script>

export default {
  name: 'SearchHome',
  data() {
    return {
      input1: ''
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
  background-color: #e6e6e6;
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
    margin: 40px 0;
  }

  &-pagination{
    text-align: center;
  }
}

.el-card{
  margin-bottom: 20px;
  background-color: #fff;  
  border: 1px solid #1a1a1a;
  border-radius: none;
  box-shadow: none;
  
  .image{
    display: block;
    width: 100%;
    padding: 10px;    
    min-height: 250px;    
  }

  .desc{
    padding: 14px;    
    border-top: 1px solid #1a1a1a;
  }
  h2{
    margin: 0;    
  }
  hr{
    height: 10px;
    background-color: $bb-yellow;
    border: none;
    width: 10%;    
  }

}
</style>