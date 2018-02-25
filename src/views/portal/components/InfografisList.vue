<template>
  <div class="infografis-list">      
    <div class="infografis-header"> INFOGRAFIS</div>
    <div class="infografis-content"> 
        <el-row :gutter="20" >
            <el-col :span="8" v-for="(infografis, index) in list" :key="infografis.id" class="infografis-card">
                <div>
                    {{ infografis.id }}
                </div>
            </el-col>
        </el-row>    
    </div>
    <div class="infografis-paging">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="20">
    </el-pagination>
    </div>
  </div>
</template>

<script>
import ArticleSeparator from '@/components/ArticleSeparator'
export default {
  name: 'InfografisList',
  components: {
    ArticleSeparator
  },
  data() {
    return {
      list: [
        {
          id: '1'
        },
        {
          id: '2'
        },
        {
          id: '3'
        },
        {
          id: '4'
        },
        {
          id: '5'
        },
        {
          id: '6'
        }
      ]
    }
  },
  created() {
    console.log('infografis list')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/infografis-list.scss";

</style>