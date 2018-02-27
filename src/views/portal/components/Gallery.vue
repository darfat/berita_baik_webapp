<template>
  <div class="gallery-detail">      
    <div class="gallery-content"> 
        <el-row :gutter="20" >
            <el-col :span="22" class="gallery-col">
                  <div class="gallery-thumbnail">
                      <img :src="mainGallery.image" class="gallery-image" />
                      <div class="gallery-image-title">
                        <p >{{ mainGallery.editorial }}</p>
                      </div>
                  </div>
                  <div class="gallery-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="gallery-content-title">
                      <div>
                        <span>{{ mainGallery.title}}</span>
                      </div>
                    </el-row>
                    <el-row class="gallery-content-teaser">
                      <div>
                        <span>{{ mainGallery.teaser}}</span>
                      </div>
                    </el-row>
                    <el-row class="gallery-content-content">
                      <div>
                        <span>{{ mainGallery.content}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="gallery-footer">
                        <div>
                          {{ mainGallery.reporter.name }} | {{ mainGallery.publish_date_counter }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
            </el-col>
        </el-row>            
    </div>
    <div class="gallery-card-container">    
        <el-row :gutter="20" >
            <el-col :span="7" v-for="(g) in galleries" :key="g.id" class="gallery-col">
                <el-card  :body-style="{ padding: '0px' }" class="gallery-card">
                  <div class="gallery-thumbnail">
                      <img :src="g.image" class="gallery-image" />
                      <div class="gallery-image-title">
                        <p >{{ g.editorial }}</p>
                      </div>
                  </div>
                  <hr/>
                  <div class="gallery-info">
                    <div class="bottom clearfix">
                      <el-row >
                        <el-col :span="4">
                          <span> <v-icon name="heart" base-class="icon-20"></v-icon> </span>
                          <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
                        </el-col>
                    </el-row>
                    </div>
                    <el-row class="gallery-content-title">
                      <div>
                        <span>{{ g.title}}</span>
                      </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><article-separator></article-separator></el-col>
                    </el-row>
                    <el-row >
                        <el-col class="gallery-footer">
                        <div>
                          {{ g.reporter.name }} | {{ g.publish_date_counter }}
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-card>
            </el-col>
        </el-row>     
    </div>
    <div class="gallery-paging">
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
export default {
  name: 'Gallery',
  components: {
    ArticleSeparator
  },
  data() {
    return {
      mainGallery: {
        id: '1',
        image: 'static/upload/images/3.jpg',
        editorial: 'Teknologi',
        title: 'Title 1',
        reporter: {
          id: '1',
          name: 'Boim',
          role: 'reporter'
        },
        publish_date_counter: '2 Jam Yang lalu',
        teaser: 'This is teaser',
        content: 'this is content....'
      },
      galleries: [{
        id: '1',
        image: 'static/upload/images/4.jpg',
        editorial: 'Teknologi',
        title: 'Title 1',
        reporter: {
          id: '1',
          name: 'Boim',
          role: 'reporter'
        },
        publish_date_counter: '2 Jam Yang lalu',
        teaser: 'This is teaser',
        content: 'this is content....'
      },
      { id: '2',
        image: 'static/upload/images/2.jpg',
        editorial: 'Teknologi',
        title: 'Title 1',
        reporter: {
          id: '1',
          name: 'Boim',
          role: 'reporter'
        },
        publish_date_counter: '2 Jam Yang lalu',
        teaser: 'This is teaser',
        content: 'this is content....'
      },
      { id: '3',
        image: 'static/upload/images/5.jpg',
        editorial: 'Teknologi',
        title: 'Title 1',
        reporter: {
          id: '1',
          name: 'Boim',
          role: 'reporter'
        },
        publish_date_counter: '2 Jam Yang lalu',
        teaser: 'This is teaser',
        content: 'this is content....'
      }]
    }
  },
  created() {
    console.log('gallery')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/gallery.scss";

</style>