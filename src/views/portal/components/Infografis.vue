<template>
  <div class="infografis-detail">      
    <div class="infografis-header"> INFOGRAFIS</div>
    <div class="infografis-content"> 
        <el-row :gutter="20" v-loading="loading.infografis" >
            <el-col :span="22" class="infografis-col">
                  <div class="infografis-thumbnail">
                      <img :src="infografis.main_image" class="infografis-image" />
                      
                  </div>
                  <div class="infografis-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <bb-love></bb-love> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="infografis-content-title">
                      <div>
                        <span>{{ infografis.title}}</span>
                      </div>
                    </el-row>
                    <el-row class="infografis-content-teaser">
                      <div>
                        <div v-html="infografis.teaser">
                        
                        </div>
                      </div>
                    </el-row>
                    <el-row class="infografis-content-content">
                      <div>
                        <div v-html="infografis.content">
                        
                        </div>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="infografis-footer">
                        <div>
                          {{ infografis.reporter.name }} | <timeago :since="infografis.publish_date"></timeago> 
                        </div>
                      </el-col>
                    </el-row>
                  </div>
            </el-col>
        </el-row>    
    </div>
    <div class="infografis-paging">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="20"
        prev-text="Pertama" next-text="Terakhir"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'

import { getArticle } from '@/api/article'

export default {
  name: 'Infografis',
  components: {
    ArticleSeparator,
    BbLove
  },
  props: {
    articleID: { type: String },
    editorialSlug: { type: String },
    slug: { type: String }
  },
  data() {
    return {
      infografis: {},
      loading: {
        infografis: false
      }
    }
  },
  created() {
    this.init()
    console.log('get infografis by id')
  },
  methods: {
    init() {
      this.getMainArticle(this.articleID)
    },
    getMainArticle(articleID) {
      this.loading.infografis = true
      getArticle({ articleID }).then(response => {
        if (response) {
          this.infografis = response
          this.loading.infografis = false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/infografis.scss";

</style>