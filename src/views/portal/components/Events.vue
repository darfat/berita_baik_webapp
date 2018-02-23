<template>
  <div class="events">      
    <el-row :gutter="20" >
        <el-col :span="8"  >
            <span>Acara </span> <span>Bulan Ini</span> <span>&lt; &gt;  </span>
        </el-col>
    </el-row>
    <el-row >
    </el-row>
    <el-row :gutter="20" >
      <el-col :span="6">
        <el-row >
          <el-col >
            <span>DESEMBER</span><br/>
            <span>Event abcd</span>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
         <el-row gutter="20">
          <el-col :span="12" >
             <div class="event-text-circle p-t-18"> 01 </div>
          </el-col>
          <el-col :span="12" >
             <div > events </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6">
      </el-col>
      <el-col :span="6">
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'Events',
  data() {
    return {}
  },
  created() {
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/events.scss";

</style>
