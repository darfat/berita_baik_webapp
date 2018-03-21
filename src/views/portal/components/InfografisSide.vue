<template>
<div >
          <div class="infografis-news m-t-10">
            <el-row :gutter="20" v-for="(infografis) in infografis_list" :key="infografis.id" class="side-row"  >
              <el-col :span="24" class="side-image">
                <div>
                  <img :src="infografis.main_image" class="card-image"/>
                </div>
              </el-col>
            </el-row>            
          </div>
</div>
</template>
<script>
import { getImagesByEditorialSlug } from '@/api/article'

export default {
  name: 'InfografisSide',
  props: {
    editorialSlug: { type: String, default: 'infografis' },
    limit: { default: 1, type: Number },
    page: { default: 1, type: Number }
  },
  data() {
    return {
      infografis_list: [],
      loading: {
        infografis_list: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getLatestInfografis(this.editorialSlug)
    },
    getLatestInfografis(editorialSlug) {
      this.loading.infografis_list = true
      getImagesByEditorialSlug({ editorialSlug, page: 1, per_page: this.limit }).then(response => {
        if (response) {
          this.infografis_list = response.data
          this.loading.infografis_list = false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/infografis-side.scss";

</style>