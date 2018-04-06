<template>
  <div class="infografis-list">      
    <div class="infografis-header"> INFOGRAFIS</div>
    <!--
    <div class="infografis-content"> 
        <el-row  v-loading="loading.list"  >
            <el-col :span="8" v-for="(infografis) in list" :key="infografis.id" class="infografis-col">
                <el-card  :body-style="{ padding: '0px' }" class="infografis-card">
                  <div class="infografis-thumbnail">
                      <router-link :to="{ path: '/infografis/slug-id' }">
                        <img :src="infografis.main_image" class="infografis-image" />
                        <div class="infografis-image-title">
                          <p >{{ infografis.editorial.name }}</p>
                        </div>
                      </router-link>
                  </div>
                  <hr/>
                  <div class="infografis-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <bb-love></bb-love> </span>
                          <span> <fa-icon name="share-alt" scale="1.3"  ></fa-icon>  </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="infografis-content-title">
                      <div>
                       <router-link  :to="{ name: 'infografis-detail-layout', params: { editorialSlug, 'slug': infografis.slug,  'articleID': infografis.id} }" >
                          <span>{{ infografis.title}}</span>
                       </router-link>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="infografis-footer">
                        <div>
                          {{ infografis.reporter_name }} | <timeago :since="infografis.publish_date"></timeago>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
            </el-col>
        </el-row>    
    </div>-->
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
import { getImagesByEditorialSlug } from '@/api/article'
import { getEditorialLabelBySlug } from '@/api/editorial'

export default {
  name: 'InfografisList',
  components: {
    ArticleSeparator,
    BbLove
  },
  props: {
    editorialSlug: { type: String, default: 'infografis' },
    limit: { default: 6, type: Number }
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
      this.editorialTitle = getEditorialLabelBySlug(this.editorialSlug)
      this.getArticles(this.editorialSlug)
    },
    getArticles(editorialSlug) {
      this.loading.list = true
      if (editorialSlug) {
        getImagesByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit + 1 }).then(response => {
          if (response) {
            this.list = response.data
            this.loading.list = false
          }
        })
      }
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/infografis-list.scss";

.el-row {
  margin-bottom: 3px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
    border-radius: 0px;
}
</style>