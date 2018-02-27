<template>
  <div class="infografis-detail">      
    <div class="infografis-header"> INFOGRAFIS</div>
    <div class="infografis-content"> 
        <el-row :gutter="20" >
            <el-col :span="22" class="infografis-col">
                  <div class="infografis-thumbnail">
                      <img :src="infografis.image" class="infografis-image" />
                      <div class="infografis-image-title">
                        <p >{{ infografis.editorial }}</p>
                      </div>
                  </div>
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
                    <el-row class="infografis-content-teaser">
                      <div>
                        <span>{{ infografis.teaser}}</span>
                      </div>
                    </el-row>
                    <el-row class="infografis-content-content">
                      <div>
                        <span>{{ infografis.content}}</span>
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
export default {
  name: 'Infografis',
  components: {
    ArticleSeparator
  },
  data() {
    return {
      infografis: {
        id: '1',
        image: 'static/upload/images/infografis.jpg',
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
      }
    }
  },
  created() {
    console.log('infografis')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/infografis.scss";

</style>