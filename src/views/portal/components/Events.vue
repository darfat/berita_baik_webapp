<template>
  <div class="events">      
    <el-row :gutter="20" class="events-title">
        <el-col :span="8"  >
            <span class="font-black">ACARA </span> <span class="font-blue" >BULAN INI 
              <v-icon name="chevron-left" base-class="icon-20 v-align-middle"></v-icon>
              <v-icon name="chevron-right" base-class="icon-20 v-align-middle"></v-icon>
            </span>
        </el-col>
    </el-row>
    <el-row >
    </el-row>
    <el-row :gutter="20" class="events-content" >
      <el-col :span="6">
        <el-row >
          <el-col >
            <div class="events-month" >DESEMBER</div>
            <div>Cicero famously orated against his political opponent Lucius Sergius Catilina.</div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="events-separator">
         <el-row :gutter="20" >
          <el-col :span="8" class="align-center" >
             <div class="event-text-circle "> <span class="events-date"> 01 </span> </div>
          </el-col>
          <el-col :span="16" >
             <div > 
               <ul>
                 <li> Event 1</li>
                 <li> Event 2</li>
               </ul>
                
              </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="events-separator">
        <el-row :gutter="20" >
          <el-col :span="8" class="align-center" >
             <div class="event-text-circle "> <span class="events-date"> 03 </span> </div>
          </el-col>
          <el-col :span="16" >
             <div > 
               <ul>
                 <li> Event number 1</li>
                 <li> Event number 2</li>
               </ul>
                
              </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" class="events-separator">
        <el-row :gutter="20" >
          <el-col :span="8" class="align-center" >
             <div class="event-text-circle "> <span class="events-date"> 18 </span> </div>
          </el-col>
          <el-col :span="16" class="" >
             <div > 
               <ul>
                 <li> Event part 1</li>
                 <li> Event part 2</li>
               </ul>
                
              </div>
          </el-col>
        </el-row>
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
