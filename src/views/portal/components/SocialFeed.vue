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
                    <a href="https://www.facebook.com/beritabaik.id/" target="_blank"><fa-icon name="facebook" scale="1" class="circle-white-icon" ></fa-icon></a>
                    <a href="https://twitter.com/beritabaik_id" target="_blank"><fa-icon name="twitter" scale="1" class="circle-white-icon" ></fa-icon></a>
                    <a href="https://www.instagram.com/beritabaik.id/" target="_blank"><fa-icon name="instagram" scale="1" class="circle-white-icon" ></fa-icon></a>                    
                </div>
            </div>
        
        </el-col>
        <el-col :span="18" class="feed-list">
            <el-row :gutter="20" class="feed-content">
                <el-col :span="8" class="feed-box">
                    <div class="feed-stream">
                        <div id="fb-root"></div>
                        <!-- <div class="fb-page" data-href="https://www.facebook.com/beritabaik.id/" data-tabs="timeline" data-height="350" data-small-header="true" data-adapt-container-width="true" data-hide-cover="false" data-show-facepile="true"><blockquote cite="https://www.facebook.com/beritabaik.id/" class="fb-xfbml-parse-ignore"><a href="https://www.facebook.com/beritabaik.id/">beritabaik.id</a></blockquote></div> -->
                    </div>
                </el-col>
                <el-col :span="16" class="feed-box">
                    <div class="feed-logo">
                        <a href="https://twitter.com/beritabaik_id" target="_blank"><fa-icon name="twitter" scale="1" class="icon" ></fa-icon></a>
                        <span>beritabaik_id</span>
                    </div>
                    <div class="feed-stream">
                        <!-- <v-timeline :id="'beritabaik_id'" :sourceType="'profile'" :options="{ tweetLimit: '1',height: '100px'  }"/> -->
                    </div>
                </el-col>
            </el-row>
            <el-row :gutter="20" class="feed-content" >
                <el-col :span="8" class="feed-box">
                    <div class="feed-logo">
                        <a href="https://www.instagram.com/beritabaik.id/" target="_blank"><fa-icon name="instagram" scale="1" class="icon" ></fa-icon></a>
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
                         <a href="https://www.instagram.com/beritabaik.id/" target="_blank"><fa-icon name="instagram" scale="1" class="icon" ></fa-icon></a>
                        <span>beritabaik.id</span>
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
.timeline-Header .timeline-InformationCircle-widgetParent {
    font-size: 1em;
    line-height: 1em;
}
.timeline-Header-title .u-inlineBlock{
font-size: 1em;
    line-height: 1em;
}
</style>
