<template>
  <div class="events">      
    

    <el-row :gutter="20" class="events-title">
        <el-col :xs="24" :sm="8"  >
            <span class="font-black">ACARA </span> <span class="font-blue" >BULAN INI 
              <el-button type="text" class="main-blue" @click="handleMonthChanged(-1)" >
                <v-icon name="chevron-left" base-class="icon-20 v-align-middle" ></v-icon>
              </el-button>
              <el-button type="text"  class="main-blue" @click="handleMonthChanged(1)"  >
                <v-icon name="chevron-right" base-class="icon-20 v-align-middle" ></v-icon>
              </el-button>
            </span>
        </el-col>
    </el-row>
    <el-row :gutter="20" class="events-content" >
      <el-col :xs="24" :sm="6">
        <el-row >
          <el-col >
            <p class="red-line"></p>            
            <div class="events-month" >{{periodMonth}}</div>
            <p class="desc">Cicero famously orated against his political opponent Lucius Sergius Catilina.</p>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="6" class="events-separator">       
         <el-row :gutter="20" >
          <el-col :span="8" class="mc">
            <div class="mc-content">
              <div class="event-text-circle "> 
                  <span class="events-date" v-if="groupedEvents && groupedEvents[0]" > {{groupedEvents[0].date.split("-")[2]}} </span> 
                  <span class="events-date" v-else> - </span>
              </div>
            </div>  
          </el-col>
          <el-col :span="16" class="mc">
             <div class="mc-content"> 
               <ul v-if="groupedEvents && groupedEvents[0]" >
                 <li v-for="(event) in groupedEvents[0].events" :key="event.id">{{event.title}}</li>
               </ul>                
              </div>
          </el-col>
        </el-row>        
      </el-col>
      <el-col :xs="24" :sm="6" class="events-separator">
        <el-row :gutter="20" >
          <el-col :span="8" class="mc" >
            <div class="mc-content">
              <div class="event-text-circle "> 
                <span class="events-date" v-if="groupedEvents && groupedEvents[1]" > {{groupedEvents[1].date.split("-")[2]}} </span> 
                <span class="events-date" v-else> - </span>
              </div>
            </div>
          </el-col>
          <el-col :span="16" class="mc">
             <div class="mc-content">
               <ul v-if="groupedEvents && groupedEvents[1]" >
                 <li v-for="(event) in groupedEvents[1].events" :key="event.id">{{event.title}}</li>
               </ul>
                
              </div>
          </el-col>
        </el-row>
      </el-col>
      <el-col :xs="24" :sm="6" class="events-separator">
        <el-row :gutter="20" >
          <el-col :span="8" class="mc" >
            <div class="mc-content">
             <div class="event-text-circle "> 
                <span class="events-date" v-if="groupedEvents && groupedEvents[2]" > {{groupedEvents[2].date.split("-")[2]}} </span> 
                <span class="events-date" v-else> - </span>
              </div>
             </div>
          </el-col>
          <el-col :span="16" class="mc" >
             <div class="mc-content">
               <ul v-if="groupedEvents && groupedEvents[2]" >
                 <li v-for="(event) in groupedEvents[2].events" :key="event.id">{{event.title}}</li>
               </ul>                
              </div>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getEventsByPeriod } from '@/api/event'
import moment from 'moment'
export default {
  name: 'Events',
  data() {
    return {
      period: null,
      periodMonth: '',
      aDate: null,
      loading: {
        events: false,
        premiumEvents: false
      },
      events: [],
      groupedEvents: []
    }
  },
  created() {
    this.init()
  },
  mounted() {
    this.initMounted()
  },
  methods: {
    init() {
      moment.locale('id')
      this.aDate = new Date()
      this.period = moment(this.aDate).format('YYYYMM')
      this.periodMonth = moment(this.aDate).format('MMMM')
    },
    initMounted() {
      this.getEventsByPeriod(this.period)
    },
    handleMonthChanged(inc) {
      this.aDate = moment(this.aDate).add(inc, 'month')
      this.period = this.aDate.format('YYYYMM')
      this.periodMonth = this.aDate.format('MMMM')
      this.getEventsByPeriod(this.period)
    },
    getEventsByPeriod(period) {
      this.loading.events = true
      this.groupedEvents = []
      getEventsByPeriod({
        period
      }).then(response => {
        if (response && response.data) {
          const data = response.data
          // this gives an object with dates as keys
          const groups = data.reduce((groups, event) => {
            const date = event.date.split('T')[0]
            if (!groups[date]) {
              groups[date] = []
            }
            groups[date].push(event)
            return groups
          }, {})

          // Edit: to add it in the array format instead
          this.groupedEvents = Object.keys(groups).map((date) => {
            return {
              date,
              events: groups[date]
            }
          })
          // console.log(this.groupedEvents)
        }
        this.loading.events = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/events.scss";

</style>
