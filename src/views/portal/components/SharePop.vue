<template>
  <div class="dynamic-popover">
    <el-popover
      ref="dynamic"
      placement="right"
      trigger="click">
        <social-sharing
          v-if="article && article.editorial"
          :url="baseLinkPath+article.editorial.slug+'/'+article.slug"
          :title="article.title"
          :description="article.teaser"
          :quote="article.title"
          :hashtags="'beritabaik,'+article.article_tags"
          twitter-user="beritabaik_id"
          @open="openShare(article.id,baseLinkPath+article.editorial.slug+'/'+article.slug)"
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
import { updateArticleSharedCount } from '@/api/article'

export default {
  name: 'dynamic',
  props: {
    article: ''
  },
  data() {
    return {
      metaParams: {
        title: 'Berita Baik',
        ogImage: false,
        siteName: false,
        description: false,
        url: false
      },
      basePath: 'http://beritabaik.id/dev/',
      baseLinkPath: ''
    }
  },
  created() {
    this.baseLinkPath = this.basePath + '#/home/a/'
  },
  methods: {
    openShare(articleID, url) {
      // this.changeMeta(this.article, url)
      updateArticleSharedCount({ articleID }).then(response => {
      })
    },
    changeMeta(article, url) {
      var self = this
      this.metaParams.ogImage = this.basePath + article.main_image
      this.metaParams.siteName = 'Berita Baik'
      this.metaParams.url = url
      this.metaParams.description = article.teaser
      this.metaParams.title = article.title
      // http://localhost:9528/static/upload/images/5.jpg
      self.$emit('updateHead')
      // window.setTimeout(function() {
      // }, 1000)
    }
  }
  // head: {
  //   // To use "this" in the component, it is necessary to return the object through a function
  //   meta() {
  //     return [
  //       // { name: 'description', content: this.metaParams.description, id: 'metaDesc' },
  //       { name: 'twitter:title', content: this.metaParams.title, id: 'metaTwTitle' },
  //       { n: 'twitter:description', c: this.metaParams.description, id: 'metaTwDesc' },
  //       { n: 'twitter:image', c: this.metaParams.ogImage, id: 'metaTwImage' },
  //       { p: 'og:image', c: this.metaParams.ogImage, id: 'metaOgImage' },
  //       { p: 'og:site_name', c: this.metaParams.siteName, id: 'metaOgSiteName' },
  //       { p: 'og:description', c: this.metaParams.description, id: 'metaOgDesc' },
  //       { p: 'og:url', c: this.metaParams.url, id: 'metaOgUrl' }
  //     ]
  //   }
  // }
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
