<template>
  <div class="editoral-container">
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
        <div class="grid-content latest-news">
              <el-row :gutter="20">
                <el-col >
                  <div>
                      <img :src="latestNews.main_image" />
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="2"><div>love</div></el-col>
                  <el-col :span="2"><div>like</div></el-col>
              </el-row>
              <el-row :gutter="20">
                <el-col >
                  <div> 
                    {{ latestNews.title }}
                  </div>
                </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col >
                    <div v-html="latestNews.teaser">
                      
                    </div>
                  </el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="2"><div>mark</div></el-col>
              </el-row>
              <el-row :gutter="20">
                  <el-col :span="2">
                    <div>
                      {{ latestNews.reporter.name }}
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div>
                      {{ latestNews.publish_date_counter }}
                    </div>
                  </el-col>
              </el-row>
        </div>
      </el-col>
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
    <el-row :gutter="20" class="list-container">
      <el-col :span="2"><div class="grid-content"></div></el-col>

      <el-col :span="16" class="content">
        <div class="grid-content a-content">
            <el-row>
              <el-col :span="10" v-for="(article, index) in articles" :key="article.id" class="news-col">
                <el-card :body-style="{ padding: '0px' }" class="news-card">
                  <img :src="article.main_image" class="card-image"/>
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
                        <el-col :span="2"><div>mark</div></el-col>
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

        </div>
      </el-col>
      <el-col :span="4" class="side-content">
        <div class="grid-content a-side">
          <div>Berita Populer</div>
          <div>Infografis</div>
          <div>iklan</div>

        </div>
      </el-col>
      
      <el-col :span="2"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'editorials',
  data() {
    return {
      latestNews: {
        id: '1',
        main_image: 'static/images/news/img.jpg',
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
      articles: [
        {
          id: '1',
          main_image: 'static/images/news/burger.png',
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
          main_image: 'static/images/news/burger.png',
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
          main_image: 'static/images/news/burger.png',
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
          main_image: 'static/images/news/burger.png',
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
    console.log('Editorials')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/editorial-list.scss";

.el-row {
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
    border-radius: 4px;
}
</style>