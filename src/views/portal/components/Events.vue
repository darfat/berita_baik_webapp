<template>
  <div class="events">      
    

    <el-row :gutter="20" class="events-title">
        <el-col :xs="24" :sm="8"  >
            <h3>ACARA BULAN INI</h3>
            <span class="btn-control"> 
              <v-icon name="chevron-left" base-class="icon-20 v-align-middle"></v-icon>
              <v-icon name="chevron-right" base-class="icon-20 v-align-middle"></v-icon>
            </span>            
        </el-col>
    </el-row>
    <el-row :gutter="20" class="events-content" >
      <el-col :xs="24" :sm="6">
        <el-row >
          <el-col >
            <p class="red-line"></p>            
            <div class="events-month" >DESEMBER</div>
            <p class="desc">Cicero famously orated against his political opponent Lucius Sergius Catilina.</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="6" class="events-separator">       
         <el-row :gutter="20" >
          <el-col :span="8" class="mc">
            <div class="mc-content">
              <div class="event-text-circle "> <span class="events-date"> 01 </span> </div>
            </div>  
          </el-col>
          <el-col :span="16" class="mc">
             <div class="mc-content"> 
               <ul>
                 <li> Event 1</li>
                 <li> Event 2</li>
               </ul>                
              </div>
          </el-col>
        </el-row>        
      </el-col>
      <el-col :xs="24" :sm="6" class="events-separator">
        <el-row :gutter="20" >
          <el-col :span="8" class="mc" >
            <div class="mc-content">
             <div class="event-text-circle "> <span class="events-date"> 03 </span> </div>
             </div>
          </el-col>
          <el-col :span="16" class="mc">
             <div class="mc-content">
               <ul>
                 <li> Event number 1</li>
                 <li> Event number 2</li>
               </ul>
                
              </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="6" class="events-separator">
        <el-row :gutter="20" >
          <el-col :span="8" class="mc" >
            <div class="mc-content">
             <div class="event-text-circle "> <span class="events-date"> 18 </span> </div>
             </div>
          </el-col>
          <el-col :span="16" class="mc" >
             <div class="mc-content">
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
