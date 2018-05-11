<template>
  <div class="infografis-detail">      
    <el-row :gutter="20" class="content" >
      <div class="container">
        <el-col :xs="24">
          <div class="grid-content infografis" v-loading="loading.infografis" v-if="infografis.id">
                <el-row :gutter="20">
                  <el-col >
                    <div>
                        <div class="background">
                            <img :src="infografis.main_image" />                           
                        </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="content"> 
                  <el-col>
                    <el-row :gutter="20">
                        <el-col :span="4" v-if="infografis.id">
                            <span> <bb-love></bb-love> </span>
                            <span><share-pop :article="infografis"></share-pop>  </span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="ln-title">
                      <el-col >
                        <div class="headline"> 
                            {{ infografis.title }}
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col class="sub-headline">
                          <div v-html="infografis.teaser" class="article-content">
                          </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="1"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col class="footer">
                          <div class="author">
                            {{ infografis.reporter_name }} | <timeago :auto-update="60" :since="infografis.publish_date | formatDate"></timeago>
                          </div>
                        </el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="m-t-10" v-if="infografis" >
                  <el-col >
                    <comment-box :articleID="infografis.id"></comment-box>
                  </el-col>
                </el-row>
          </div>
        </el-col>
      </div>
    </el-row>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import BbLove from '@/views/portal/components/BbLove'
import SharePop from '@/views/portal/components/SharePop'
import CommentBox from '@/views/portal/components/CommentBox'

import { getArticle } from '@/api/article'

export default {
  name: 'Infografis',
  components: {
    ArticleSeparator,
    BbLove,
    SharePop,
    CommentBox
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
  },
  methods: {
    init() {
      this.getMainArticle(this.slug)
    },
    getMainArticle(slug) {
      this.loading.infografis = true
      getArticle({ slug }).then(response => {
        if (response) {
          this.infografis = response.data
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