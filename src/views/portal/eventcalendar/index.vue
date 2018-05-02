<template>
<div>
  <div class="ec">
    <div class="container">
      <div class="sld">
        <!-- swiper -->
        <swiper :options="swiperOption">
          <swiper-slide v-for="item in premiumEvents" :key="item.id" >
            <img :src="item.image">
            <h2>{{item.title}}</h2>
            <div class="desc">{{item.description}}</div>
            <div class="edate">
              <fa-icon name="clock-o"></fa-icon>
               {{item.date | formatDateOnly }} -  {{item.end_date | formatDateOnly }}
            </div>
            <div class="venue">
              <fa-icon name="map-marker"></fa-icon>
              {{item.place}} , <small>{{item.address}}</small>
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
                    {{event.date | formatDateOnly }} -  {{event.end_date | formatDateOnly }}
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
  <div class="container m-t-20">
    <div class="align-center">
      <subscribe></subscribe>
    </div>
  </div>    
</div>
</template>

<script>
import { getEventsByPeriod, getPremiumEvents } from '@/api/event'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import moment from 'moment'
import Subscribe from '@/views/portal/components/Subscribe'

export default {
  name: 'EventCalendar',
  components: { swiper, swiperSlide, Subscribe },
  data() {
    return {
      period: null,
      loading: {
        events: false,
        premiumEvents: false
      },
      events: [],
      premiumEvents: [],
      title: 'Event Calendar',
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      activeName: '1',
      page: 1,
      per_page: 5
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
      this.getPremiumEvents()
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
    },
    getPremiumEvents(period) {
      this.loading.premiumEvents = true
      this.premiumEvents = []
      getPremiumEvents({
        page: this.page,
        per_page: this.per_page
      }).then(response => {
        if (response && response.data) {
          this.premiumEvents = response.data
        }
        this.loading.premiumEvents = false
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