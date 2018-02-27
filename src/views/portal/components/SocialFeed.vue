<template>
  <div class="social-feed">      
    <el-row :gutter="20" >
        <el-col :span="6" class="feed-main">
            <div class="feed-content"> 
                <div> Dimanapun kamu berada, yuks ceritakan berita baikmu bersama 
                 <strong> beritabaik.id </strong>  
                </div>
                <article-separator></article-separator>
                <div class="feed-logo"> 
                    <v-icon name="facebook" base-class="icon-20 v-align-middle"></v-icon>
                    <v-icon name="twitter" base-class="icon-20 v-align-middle"></v-icon>
                    <v-icon name="instagram" base-class="icon-20 v-align-middle"></v-icon>
                </div>
            </div>
        
        </el-col>
        <el-col :span="18" class="feed-list">
            <el-row :gutter="20" class="feed-content">
                <el-col :span="8" class="feed-box">
                    <div class="feed-logo">
                        <v-icon name="instagram" base-class="icon-20 v-align-middle"> </v-icon>
                        <span>beritabaik.id</span>
                    </div>
                    <div class="feed-date">
                        2 Hari Yang Lalu
                    </div>
                    <div class="feed-stream">
                    </div>
                </el-col>
                <el-col :span="16" class="feed-box">
                    <div class="feed-logo">
                        <v-icon name="facebook" base-class="icon-20 v-align-middle"> </v-icon>
                        <span>beritabaik.id</span>
                        <span class="feed-date">
                            2 Hari Yang Lalu
                        </span>
                    </div>
                    <div class="feed-stream">
                        <p>
                            At the end of a storm
                            There's a golden sky
                            And the sweet silver song of a lark
                            Walk on through the wind
                            
                        </p>
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="feed-content" >
                <el-col :span="24" class="feed-box">
                    <div class="feed-logo">
                        <v-icon name="twitter" base-class="icon-20 v-align-middle"> </v-icon>
                        <span>beritabaik.id</span>
                        <span class="feed-date">
                            2 Jam Yang Lalu
                        </span>
                    </div>
                    <div class="feed-stream">
                        <p>
                            RT@infobts Hi we are BTS, Walk on through the rain
                            Though your dreams be tossed and blown
                        </p>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'

export default {
  name: 'SocialFeed',
  components: {
    ArticleSeparator
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/social-feed.scss";

</style>
