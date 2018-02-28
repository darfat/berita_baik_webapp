<template>
<div class="card-content">
  <el-row>
        <div class="section-title"> BACA LAINNYA</div>
    </el-row>
          <div>
            <el-row>
              <el-col :span="11" v-for="(article, index) in articles" :key="article.id" class="news-col">
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
                        <el-col :span="4">
                          <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="ac-title">
                      <div>
                        <span>{{ article.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="footer">
                        <div>
                          {{ article.reporter.name }} | {{ article.publish_date_counter }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
</div>
</template>


<script>
import ArticleSeparator from '@/components/ArticleSeparator'

export default {
  name: 'ArticlesCard',
  components: {
    ArticleSeparator
  },
  data() {
    return {
      articles: [
        {
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
        {
          id: '2',
<<<<<<< HEAD
          main_image: 'static/upload/images/1.jpg',
=======
          main_image: 'static/upload/images/5.jpg',
>>>>>>> origin/master
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
        {
          id: '3',
          main_image: 'static/upload/images/4.jpg',
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
        {
          id: '4',
          main_image: 'static/upload/images/5.jpg',
          teaser: '<p> Lorem ipsum dolor sit amet, <strong>mei cu</strong> praesent euripidis, veri nobis eripuit eum id. An sea suscipit similique assueverit, ad consul sententiae sadipscing eos. Vis id verear perfecto, audire accusata ea quo. Mea ex magna deserunt, cu eruditi indoctum omittantur qui. Eos ex electram maiestatis reprimique, sed partem eloquentiam cu.</p>',
          title: 'Lorem Ipsum Title',
          editorial: 'Indonesia Baik',
          reporter: {
            id: '1',
            name: 'Boim',
            role: 'reporter'
          },
          publish_date_counter: '2 Jam Yang lalu'
        }
      ]
    }
  },
  created() {
    console.log('articles card')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/articles-card.scss";


</style>