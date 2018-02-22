<template>
  <div class="article-container">
    <el-row :gutter="20" class="headline-container">
      <el-row :gutter="20">
          <el-col :span="2"><div class="grid-content"></div></el-col>
          <el-col :span="16">
            <div class="grid-content title-container">
                <span class="main-article-title"> Indonesia Baik </span> 
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
              <el-row class="content">
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
                <el-row :gutter="20" class="m-t-10 article-option">
                    <el-col :span="1">
                      <span  > 
                        Editorial <br/> Team
                      </span>
                    </el-col>
                    <el-col :span="2">
                      <img :src="mainArticle.reporter.image" class="img-circle img-mini v-align-middle"/>
                      <span> {{ mainArticle.reporter.name }} </span>
                    </el-col>
                    <el-col :span="13" class="p-tb-5">
                      <div class="follow-user">
                        <v-icon name="user" base-class="icon-20 v-align-middle"></v-icon>
                        <span  > 
                          Follow
                        </span>
                      </div>
                    </el-col>
                    <el-col :span="7" class="align-right" >
                      <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                      <span> <v-icon name="facebook" base-class="icon-20"></v-icon> </span>
                      <span> <v-icon name="mail" base-class="icon-20"></v-icon> </span>
                      <span> <v-icon name="send" base-class="icon-20"></v-icon> </span>
                      <span> <v-icon name="twitter" base-class="icon-20"></v-icon> </span>
                    </el-col>
                    <el-col :span="1">                    
                      <span> <v-icon name="more-horizontal" base-class="icon-20"></v-icon> </span>
                  </el-col>
                </el-row>
              </el-row>
              <el-row :gutter="20" class="m-t-10" >
            <el-col>
              <comment-box></comment-box>
            </el-col>
          </el-row>
        </div>
        <div>
          <el-row :gutter="20">
            <el-col>
              <article-nav></article-nav>
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
            <articles-card></articles-card>
            <el-row >
              <el-col>
              </el-col>
            </el-row>
        </div>
      </el-col>
      <el-col :span="6" class="side-content">
        <div class="grid-content a-side">
          <popular-news-side> </popular-news-side>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div>Infografis</div>
          <div class="side-separator">
            <span> Buka lebih banyak lagi </span>
          </div>
          <div>iklan</div>
          <div class="side-separator">
            <span>  </span>
          </div>
          <div>pilihan editor</div>
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
import { PopularNewsSide, ArticlesCard, CommentBox, ArticleNav } from '@/views/portal/components'

export default {
  name: 'article-detail',
  components: {
    ArticleSeparator,
    PopularNewsSide,
    ArticlesCard,
    CommentBox,
    ArticleNav
  },
  data() {
    return {
      mainArticle: {
        id: '1',
        main_image: 'static/upload/images/3.jpg',
        content: '<p> Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</p>',
        title: 'Lorem Ipsum Title',
        editorial: 'Indonesia Baik',
        reporter: {
          id: '1',
          name: 'Boim',
          role: 'reporter',
          image: 'static/upload/images/profile.jpg'
        },
        publish_date_counter: '2 Jam Yang lalu'
      },
      articles: []
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