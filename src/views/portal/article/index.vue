<template>
  <div class="article-container">
    <el-row :gutter="20" class="headline-container">
      <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="16">
            <div class="grid-content title-container">
                <span class="title"> Indonesia Baik </span> 
            </div>
          </el-col>
      </el-row>
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="20">
        <div class="grid-content main">
              <el-row :gutter="20">
                <el-col >
                  <div>
                      <div class="thumbnail">
                        <img :src="mainArticle.main_image" />
                        <div class="editorial-type-img">
                            <p>{{ mainArticle.editorial }}</p>
                        </div>
                      </div>
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="2"><div>love</div></el-col>
                  <el-col :span="2"><div>like</div></el-col>
              </el-row>
              <el-row :gutter="20" class="title">
                <el-col >
                  <div > 
                    {{ mainArticle.title }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="1"><article-separator></article-separator></el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col class="footer">
                    <div>
                      {{ mainArticle.reporter.name }} | {{ mainArticle.publish_date_counter }}
                    </div>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col >
                    <div v-html="mainArticle.content">
                      
                    </div>
                  </el-col>
              </el-row>
              <el-row >
                <el-col>
                  <div class="h-divider m-tb-10"></div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="16"><div>editorial</div></el-col>
                  <el-col :span="2"><div>love</div></el-col>
                  <el-col :span="4"><div>share</div></el-col>
                  <el-col :span="2"><div>report</div></el-col>

              </el-row>
              <el-row :gutter="20" >
                <el-col>
                  <div class="write-comments">
                      comments component
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20" >
                <el-col>
                  <div class="paging">
                      paging component
                  </div>
                </el-col>
              </el-row>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20" class="comments-container">
      <el-row :gutter="20" >
        <el-col>
          <div class="comments">
            scomments list
          </div>
        </el-col>
      </el-row>
    </el-row>
    <el-row :gutter="20" class="list-container">
      <el-col :span="2"><div class="grid-content"></div></el-col>

      <el-col :span="14" class="content">
        <div class="grid-content a-content">
            <el-row>
              <div class="section-title"> BACA LAINNYA</div>
            </el-row>
            <el-row>
              <el-col :span="10" v-for="(article, index) in articles" :key="article.id" class="news-col">
                <el-card :body-style="{ padding: '0px' }" class="news-card">
                  <div>
                      <div class="mini-thumbnail">
                        <img :src="article.main_image" class="card-image" />
                        <div class="editorial-type-img">
                            <p style="font-size:10px;">{{ article.editorial }}</p>
                        </div>
                      </div>
                  </div>
                  <div style="padding: 14px;">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="2"><div>love</div></el-col>
                        <el-col :span="2"><div>like</div></el-col>
                    </el-row>
                    </div>
                    <el-row >
                      <div>
                        <span>{{ article.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="4">
                          <div>
                            {{ article.reporter.name }}
                          </div>
                        </el-col>
                        <el-col :span="10">
                          <div>
                            {{ article.publish_date_counter }}
                          </div>
                        </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
            <el-row >
              <el-col>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col :span="6" class="side-content">
        <div class="grid-content a-side">
          <el-row>
              <div class="section-title"> BERITA BAIK TERPOPULAR</div>
          </el-row>
          <div class="popular-news">
            <el-row v-for="(article) in popular_articles" :key="article.id"  >
              <el-col :span="6">
                <div>
                  <img :src="article.main_image" class="card-image"/>
                </div>
              </el-col>
              <el-col :span="18">
                <div>
                    <el-row >
                      <div>
                        <span>{{ article.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="6">
                          <div>
                            {{ article.reporter.name }}
                          </div>
                        </el-col>
                        <el-col :span="10">
                          <div>
                            {{ article.publish_date_counter }}
                          </div>
                        </el-col>
                    </el-row>
                </div>
              </el-col>         
            </el-row>            
          </div>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div>Infografis</div>
          <div>iklan</div>
          <div>Pilihan editor</div>

        </div>
      </el-col>
      
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="20" class="content">
              <div class="h-divider m-tb-10"></div>
          </el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20" class="events-container">
      <el-col :span="2"><div class="grid-content"></div></el-col>
      <el-col :span="14" class="content">
            events
      </el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>  
    <el-row :gutter="20">
      <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="22" class="content">
              <div class="h-divider m-tb-10"></div>
          </el-col>
      <el-col :span="1"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20" class="subscriber-container">
      <el-col :span="1"><div class="grid-content"></div></el-col>
          <el-col :span="22" class="content">
              <div >Subscriber</div>
          </el-col>
      <el-col :span="1"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'

export default {
  name: 'article-detail',
  components: {
    ArticleSeparator
  },
  data() {
    return {
      mainArticle: {
        id: '1',
        main_image: 'static/images/news/img.jpg',
        content: '<p> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>',
        title: 'Lorem Ipsum Title',
        editorial: 'Indonesia Baik',
        reporter: {
          id: '1',
          name: 'Boim',
          role: 'reporter'
        },
        publish_date_counter: '2 Jam Yang lalu'
      },
      articles: [],
      popular_articles: []
    }
  },
  created() {
    console.log('Article Detail')
    console.log(this.$route.params.editorialSlug)
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/article.scss";

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
    border-radius: 4px;
}
</style>