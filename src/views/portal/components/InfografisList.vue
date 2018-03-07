<template>
  <div class="infografis-list">      
    <div class="infografis-header"> INFOGRAFIS</div>
    <div class="infografis-content"> 
        <el-row >
            <el-col :span="8" v-for="(infografis) in list" :key="infografis.id" class="infografis-col">
                <el-card  :body-style="{ padding: '0px' }" class="infografis-card">
                  <div class="infografis-thumbnail">
                      <router-link :to="{ path: '/infografis/slug-id' }">
                        <img :src="infografis.image" class="infografis-image" />
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
                          <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="infografis-content-title">
                      <div>
                        <span>{{ infografis.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="infografis-footer">
                        <div>
                          {{ infografis.reporter.name }} | {{ infografis.publish_date_counter }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
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
import { getNewsByEditorialSlug } from '@/api/article'
import { getEditorialLabelBySlug } from '@/api/editorial'

export default {
  name: 'InfografisList',
  components: {
    ArticleSeparator
  },
  props: {
    editorialSlug: { type: String },
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
        getNewsByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit + 1 }).then(response => {
          if (response) {
            this.list = response
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

.el-pager {
    border-radius: 50%;
    background-color: green;
}

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