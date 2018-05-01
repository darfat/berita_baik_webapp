<template>
<div class="ec">
  <div class="container">
    <div class="sld">
      <!-- swiper -->
      <swiper :options="swiperOption">
        <swiper-slide>
          <img src="/static/upload/images/5.jpg">
          <h2>Pinnacle of Sail Indonesia 2018 annual Yacht Rally, Sabang</h2>
          <div class="desc">Continuing of tradition of annual sailing accros the vast Indonesian seas, the Sail Indonesia 2017 Rally will again take place this year starting from the month of August to December.</div>
          <div class="edate">
            <fa-icon name="clock-o"></fa-icon>
            25-28 Desember 2018
          </div>
          <div class="venue">
            <fa-icon name="map-marker"></fa-icon>
            Sabang, Banda Aceh
          </div>
        </swiper-slide>

        <swiper-slide>
          <img src="/static/upload/images/5.jpg">
          <h2>Pinnacle of Sail Indonesia 2018 annual Yacht Rally, Sabang</h2>
          <div class="desc">Continuing of tradition of annual sailing accros the vast Indonesian seas, the Sail Indonesia 2017 Rally will again take place this year starting from the month of August to December.</div>
          <div class="edate">
            <fa-icon name="clock-o" fa-6></fa-icon>
            25-28 Desember 2018
          </div>
          <div class="venue">
            <fa-icon name="map-marker"></fa-icon>
            Sabang, Banda Aceh
          </div>
        </swiper-slide>
        
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="cld" >
      <h2>Acara Bulan Ini</h2>      
      <vue-event-calendar :events="events"  @month-changed="handleMonthChanged" >
        <template slot-scope="props">
          <el-collapse accordion v-model="activeName" v-for="(event, index) in props.showEvents" :key="index" v-loading="loading.events">
            <el-collapse-item :name=index>
              <template slot="title">            
                <div v-if="activeName === index" >
                  <h2>{{event.title}}</h2>              
                </div>
                <div v-else>              
                  <img :src="event.image" :alt="event.title" ><h2>{{event.title}}</h2>           
                </div>
              </template>
              <img :src="event.image" >
              <h3>Details:</h3>
              <p>{{event.description}}</p>
              <div class="edate">
                <fa-icon name="clock-o" ></fa-icon>
                {{event.event_date}}
              </div>
              <div class="venue">
                <fa-icon name="map-marker"></fa-icon>
                {{event.place}}
                <small>{{event.address}}</small>
              </div>
              <div class="venue">
                <fa-icon name="tag"></fa-icon>Ticketing <a :href="event.ticketing_url" target="_blank"  >[Registration Here]</a>
                {{event.place}}
              </div>              
            </el-collapse-item>
          </el-collapse>
          
        </template>
      </vue-event-calendar>
      <hr />
    </div>
  </div>  
</div>
    
</template>

<script>
import { getEventsByPeriod } from '@/api/event'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'

export default {
  name: 'EventCalendar',
  components: { swiper, swiperSlide },
  data() {
    return {
      period: null,
      loading: {
        events: false
      },
      events: [],
      title: 'Event Calendar',
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      activeName: '1'
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
      this.period = moment(new Date()).format('YYYYMM')
    },
    initMounted() {
      this.$EventCalendar.toDate(moment(new Date()).format('YYYY/MM/DD'))
      this.getEventsByPeriod(this.period)
    },
    handleDayChanged(data) {
      // console.log('date-changed', data)
    },
    handleMonthChanged(data) {
      // console.log('month-changed', data)
      const datas = data.split('/')
      this.period = datas[1] + datas[0]
      this.getEventsByPeriod(this.period)
    },
    getEventsByPeriod(period) {
      this.loading.events = true
      this.events = []
      getEventsByPeriod({
        period
      }).then(response => {
        if (response && response.data) {
          response.data.forEach(item => {
            item.date = moment(item.date).format('YYYY/MM/DD')
            this.events.push(item)
          })
        }
        this.loading.events = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/event-calendar.scss";


.el-row {
  margin-bottom: 3px;
  &:last-child {
    margin-bottom: 3px;
  }
}
.el-col {
  border-radius: 0px;
}
</style>