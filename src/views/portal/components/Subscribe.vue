<template>
  <div class="subscribe">      
    <el-row :gutter="20" class="subscribe-content">
        <el-col :span="8"  >
            <span>  <v-icon name="mail" base-class="icon-1dot8em v-align-middle"></v-icon>  </span>
            <span>SELALU UPDATE</span>
            <span class="font-blue"> BERITA BAIK</span>
            
        </el-col>
        <el-col :span="6"  >
            <span> <el-input placeholder="Nama Anda" ></el-input> </span>

        </el-col>
        <el-col :span="6"  >
            <span> <el-input placeholder="Surel Anda" ></el-input></span>
        </el-col>

    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Subscribe',
  data() {
    return {}
  },
  created() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/subscribe.scss";

</style>
