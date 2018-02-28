<template>
  <div class="editoral-container">
    <el-row :gutter="20" class="headline-container">
      <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="16">
            <div class="grid-content title-container">
                <span class="main-article-title"> {{ editorialTitle }} </span> 
            </div>
          </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2"><div class="grid-content"></div></el-col>
        <el-col :span="20">
          <div class="grid-content latest-news">
                <el-row :gutter="20">
                  <el-col >
                    <div>
                        <div class="background">
                          <img :src="latestNews.main_image" />
                          <div class="editorial-type-img">
                              <p>{{ editorialTitle }}</p>
                          </div>
                        </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row :gutter="20" class="content"> 
                  <el-col>
                    <el-row :gutter="20">
                        <el-col :span="4">
                            <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                            <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" class="ln-title">
                      <el-col >
                        <div > 
                          {{ latestNews.title }}
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col >
                          <div v-html="latestNews.teaser" class="article-content">
                          </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="1"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col class="footer">
                          <div>
                            {{ latestNews.reporter.name }} | {{ latestNews.publish_date_counter }}
                          </div>
                        </el-col>
                    </el-row>
                  </el-col>
                </el-row>
          </div>
        </el-col>
        <el-col :span="2"><div class="grid-content"></div></el-col>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">
      <el-col :span="2"><div class="grid-content"></div></el-col>

      <el-col :span="14" class="content">
        <div class="grid-content">
            <articles-card></articles-card>
        </div>
      </el-col>
      <el-col :span="6" class="side-content">
        <div class="grid-content a-side">
          <popular-news-side> </popular-news-side>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div><router-link :to="{ path: '/infografis' }"> Infografis </router-link></div>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div>iklan</div>

        </div>
      </el-col>
      
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
import { PopularNewsSide, ArticlesCard } from '@/views/portal/components'
import { getEditorialLabelBySlug } from '@/api/editorial'

export default {
  name: 'editorials',
  components: {
    ArticleSeparator,
    PopularNewsSide,
    ArticlesCard
  },
  data() {
    return {
      latestNews: {
        id: '1',
        main_image: 'static/upload/images/3.jpg',
        teaser: '<p> Lorem ipsum dolor sit amet, <strong>mei cu</strong> praesent euripidis, veri nobis eripuit eum id. An sea suscipit similique assueverit, ad consul sententiae sadipscing eos. Vis id verear perfecto, audire accusata ea quo. Mea ex magna deserunt, cu eruditi indoctum omittantur qui. Eos ex electram maiestatis reprimique, sed partem eloquentiam cu.</p>',
        title: 'Lorem Ipsum Title',
        editorial: 'Indonesia Baik',
        reporter: {
          id: '1',
          name: 'Boim',
          role: 'reporter'
        },
        publish_date_counter: '2 Jam Yang lalu'
      },
      editorialTitle: ''
    }
  },
  created() {
    console.log('Editorials')
    console.log(this.$route.params.editorialSlug)
    this.init()
  },
  methods: {
    init() {
      this.editorialTitle = getEditorialLabelBySlug(this.$route.params.editorialSlug)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-list.scss";

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