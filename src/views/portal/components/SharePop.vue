<template>
  <div class="dynamic-popover">
    <el-popover
      ref="dynamic"
      placement="right"
      trigger="click">
        <social-sharing
          v-if="article"
          :url="'http://beritabaik.id/#/home/a/'+article.editorial.slug+'/'+article.slug"
          :title="article.title"
          :description="article.teaser"
          :quote="article.title"
          :hashtags="'beritabaik,'+article.article_tags"
          inline-template>
          <div class="share-pop">
            <network network="facebook">
              <fa-icon name="facebook-f" scale="1" class="network-icon"></fa-icon>
            </network>
            <network network="twitter">
              <fa-icon name="twitter" scale="1" class="network-icon"></fa-icon>
            </network>
            <network network="email">
              <fa-icon name="envelope" scale="1" class="network-icon"></fa-icon>
            </network>
            <network network="googleplus">
              <fa-icon name="google-plus" scale="1" class="network-icon"></fa-icon>
            </network>
            <network network="whatsapp">
              <fa-icon name="whatsapp" scale="1" class="network-icon" title="Whatsapp"></fa-icon>
            </network>
            </div>
        </social-sharing>      
    </el-popover>
    
    <el-button v-popover:dynamic icon="el-icon-share"></el-button>
  </div>
</template>
<script>
export default {
  name: 'dynamic',
  props: {
    article: ''
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.dynamic-popover{
  display: inline;  
}
.el-button{
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  font-size: 1.4em;
  color: #323232;
  -webkit-text-stroke: 1px #323232;
  &:hover{
    color: #928e8e;
    -webkit-text-stroke: 1px #928e8e;
  }
}
</style>
