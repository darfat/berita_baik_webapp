<template>
  <div class="editor-pick-news">
    <div class="section-title" v-if="showTitle"> {{title}} </div>
    <div>
      <el-row :gutter="20" v-for="(item) in list" :key="item.id" class="side-row">
        <el-col :span="8" class="side-image">
                <div v-if="item.editorial"> 
                  <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':item.editorial.slug, 'slug': item.slug,  'articleID': item.id} }">
                    <img :src="item.main_image" class="card-image"/>
                  </router-link>
                </div>
              </el-col>
              <el-col :span="16" class="side-content">
                <div class="content-container">
                   <el-row class="side-title-section">
                      <div v-if="item.editorial">
                        <router-link :to="{ name: 'article-detail-route', params: { 'editorialSlug':item.editorial.slug, 'slug': item.slug,  'articleID': item.id} }">
                          <span class="headline">{{ item.title}}</span>
                        </router-link>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col  class="side-footer">
                         <div class="author">
                          {{ item.reporter_name }} | <timeago :since="item.publish_date"></timeago>
                        </div>
                        </el-col>
                    </el-row>
                </div>
              </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { getEditorsPickNewss } from '@/api/article'
import ArticleSeparator from '@/components/ArticleSeparator'

export default {
  name: 'EditorPickNewsSide',
  props: {
    limit: { default: 1, type: Number },
    page: { default: 1, type: Number },
    showTitle: { default: true, type: Boolean },
    title: { default: 'Pilihan Editor', type: String }
  },
  components: {
    ArticleSeparator
  },
  data() {
    return {
      list: [],
      loading: {
        list: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getList()
    },
    getList() {
      this.loading.list = true
      getEditorsPickNewss({ page: this.page, per_page: this.limit }).then(response => {
        if (response) {
          this.list = response.data.data
        }
        this.loading.list = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editor-pick-news-side.scss";

</style>