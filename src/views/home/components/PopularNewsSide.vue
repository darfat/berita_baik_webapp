<template>
<div >
          <el-row>
              <div class="section-title"> BERITA BAIK TERPOPULAR</div>
          </el-row>
          
          <div class="popular-news m-t-10">
            <el-row v-for="(article) in popular_articles" :key="article.id" class="side-row"  >
              <el-col :span="8" class="side-image">
                <div>
                  <img :src="article.main_image" class="card-image"/>
                </div>
              </el-col>
              <el-col :span="16" class="side-content">
                <div class="content-container">
                   <el-row class="side-title-section">
                      <div>
                        <span>{{ article.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col  class="footer">
                         <div>
                          {{ article.reporter.name }} | {{ article.publish_date_counter }}
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
import ArticleSeparator from '@/components/ArticleSeparator'

export default {
  name: 'PopularNewsSide',
  components: {
    ArticleSeparator
  },
  data() {
    return {
      popular_articles: [
        {
          id: '1',
          main_image: 'static/upload/images/6.jpg',
          teaser: '<p> Lorem ipsum dolor sit amet, <strong>mei cu</strong> praesent euripidis, veri nobis eripuit eum id. An sea suscipit similique assueverit, ad consul sententiae sadipscing eos. Vis id verear perfecto, audire accusata ea quo. Mea ex magna deserunt, cu eruditi indoctum omittantur qui. Eos ex electram maiestatis reprimique, sed partem eloquentiam cu.</p>',
          title: 'Lorem Ipsum Title asd asdlkasd',
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
          main_image: 'static/upload/images/1.jpg',
          teaser: '<p> Lorem ipsum dolor sit amet, <strong>mei cu</strong> praesent euripidis, veri nobis eripuit eum id. An sea suscipit similique assueverit, ad consul sententiae sadipscing eos. Vis id verear perfecto, audire accusata ea quo. Mea ex magna deserunt, cu eruditi indoctum omittantur qui. Eos ex electram maiestatis reprimique, sed partem eloquentiam cu.</p>',
          title: 'Lorem Ipsum Title praesent euripidis, veri nobis eripuit eum id. An sea sus ',
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
          main_image: 'static/upload/images/2.jpg',
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
        }
      ]
    }
  },
  created() {
    console.log('popular side news')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/popular-news-side.scss";

</style>