<template>
<div >    
        <div class="section-title"> IKLAN </div>
          <div class="advertisement-news m-t-10">
            <el-row :gutter="20" v-for="(advertisement) in advertisement_list" :key="advertisement.id" class="side-row"  >
              <el-col :span="24" class="side-image">
                <div>
                  <img :src="advertisement.main_image" class="card-image"/>
                </div>
              </el-col>
            </el-row>            
          </div>
</div>
</template>
<script>

export default {
  name: 'AdvertisementSide',
  props: {
    limit: { default: 1, type: Number },
    page: { default: 1, type: Number }
  },
  data() {
    return {
      advertisement_list: [
        {
          id: 1,
          main_image: 'static/images/ads1.jpg'
        }
      ],
      loading: {
        advertisement_list: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {}
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/advertisement-side.scss";

</style>