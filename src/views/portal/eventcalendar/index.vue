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
    <div class="cld">
      <h2>Acara Bulan Ini</h2>      
      <vue-event-calendar :events="demoEvents">
        <template slot-scope="props">
          <el-collapse accordion v-model="activeName" v-for="(event, index) in props.showEvents" :key="index">
            <el-collapse-item :name=index>
              <template slot="title">            
                <div v-if="activeName === index" >
                  <h2>{{event.title}}</h2>              
                </div>
                <div v-else>              
                  <img :src="event.img" :alt="event.title" ><h2>{{event.title}}</h2>           
                </div>
              </template>
              <img src="/static/upload/images/5.jpg" >
              <h3>Details:</h3>
              <p>{{event.details}}</p>
              <div class="edate">
                <fa-icon name="clock-o" ></fa-icon>
                {{event.date}}
              </div>
              <div class="venue">
                <fa-icon name="map-marker"></fa-icon>
                {{event.venue}}
                <small>{{event.address}}</small>
              </div>
              <div class="venue">
                <fa-icon name="tag"></fa-icon>Ticketing <a>[Registration Here]</a>
                {{event.venue}}
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
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'EventCalendar',
  components: { swiper, swiperSlide },
  data() {
    return {
      title: 'Event Calendar',
      swiperOption: {
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      activeName: '1',
      demoEvents: [{
        title: 'Title-1',
        img: '/static/upload/images/3.jpg',
        details: 'longlonglong description',
        date: '2018/05/15',
        venue: 'Bandung Convention Center',
        address: 'Jl. Seokarno Hatta No.215 Bandung',
        ticket: ''
      },
      {
        title: 'Title-2',
        img: '/static/upload/images/4.jpg',
        details: 'longlonglong description',
        date: '2018/05/24',
        venue: 'Bandung Convention Center',
        address: 'Jl. Seokarno Hatta No.215 Bandung',
        ticket: ''
      },
      {
        title: 'Title-3',
        img: '/static/upload/images/5.jpg',
        details: 'longlonglong description',
        date: '2018/05/06',
        venue: 'Bandung Convention Center',
        address: 'Jl. Seokarno Hatta No.215 Bandung',
        ticket: ''
      }]
    }
  },
  methods: {
    handleDayChanged(data) {
      console.log('date-changed', data)
    },
    handleMonthChanged(data) {
      console.log('month-changed', data)
    }
  },
  created() {
    console.log('event calendar')
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