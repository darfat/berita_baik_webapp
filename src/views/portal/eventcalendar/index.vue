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
          <div class="time">
            <fa-icon name="clock-o" fa-6></fa-icon>
            25-28 Desember 2018
          </div>
          <div class="place">
            <fa-icon name="map-marker"></fa-icon>
            Sabang, Banda Aceh
          </div>
        </swiper-slide>

        <swiper-slide>
          <img src="/static/upload/images/5.jpg">
          <h2>Pinnacle of Sail Indonesia 2018 annual Yacht Rally, Sabang</h2>
          <div class="desc">Continuing of tradition of annual sailing accros the vast Indonesian seas, the Sail Indonesia 2017 Rally will again take place this year starting from the month of August to December.</div>
          <div class="time">
            <fa-icon name="clock-o" fa-6></fa-icon>
            25-28 Desember 2018
          </div>
          <div class="place">
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
          <div v-for="(event, index) in props.showEvents" class="event-item">
            <!-- In here do whatever you want, make you owner event template -->
            {{ event.title }}
            <fa-icon name="clock-o"></fa-icon>
            <fa-icon name="map-marker"></fa-icon>
          </div>
        </template>
      </vue-event-calendar>
      <hr />
    </div>
    <div class="lst">
      <h2>05 Des</h2>
      
    
      <el-collapse accordion v-model="activeName">
        <el-collapse-item name="1">
          <template slot="title">
            <img src="/static/upload/images/5.jpg" > Consistency<i class="header-icon el-icon-info"></i>
          </template>
          <div>Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to;</div>
          <div>Consistent within interface: all elements should be consistent, such as: design style, icons and texts, position of elements, etc.</div>
        </el-collapse-item>
        <el-collapse-item title="Feedback" name="2">
          <template slot="title">
            <img src="/static/upload/images/5.jpg" class="thumb"> Consistency<i class="header-icon el-icon-info"></i>
          </template>
          <div>Operation feedback: enable the users to clearly perceive their operations by style updates and interactive effects;</div>
          <div>Visual feedback: reflect current state by updating or rearranging elements of the page.</div>
        </el-collapse-item>
        <el-collapse-item title="Efficiency" name="3">
          <div>Simplify the process: keep operating process simple and intuitive;</div>
          <div>Definite and clear: enunciate your intentions clearly so that the users can quickly understand and make decisions;</div>
          <div>Easy to identify: the interface should be straightforward, which helps the users to identify and frees them from memorizing and recalling.</div>
        </el-collapse-item>
        <el-collapse-item title="Controllability" name="4">
          <div>Decision making: giving advices about operations is acceptable, but do not make decisions for the users;</div>
          <div>Controlled consequences: users should be granted the freedom to operate, including canceling, aborting or terminating current operation.</div>
        </el-collapse-item>
      </el-collapse>
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
        img: '/static/upload/images/5.jpg',
        details: 'longlonglong description',
        date: '2018/05/15',
        venue: '',
        address: '',
        ticket: ''
      },
      {
        title: 'Title-1',
        img: '/static/upload/images/5.jpg',
        details: 'longlonglong description',
        date: '2018/05/24',
        venue: 'Bandung Convention Center',
        address: '',
        ticket: ''
      },
      {
        title: 'Title-1',
        img: '/static/upload/images/5.jpg',
        details: 'longlonglong description',
        date: '2018/05/15',
        venue: '',
        address: '',
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
.ec{
  background-color: #e6e6e6;
  padding: 20px 0;
  margin: 0;
  .sld{
    background-color: #fff;
    color: #505050;
    margin-bottom: 20px;
    img{
      float: left;
      height: 175px;
      padding-right: 20px 
    }
    h2{
      color: $main-red;
    }
    .desc{
      font-size: 12px;
      line-height: 16px;
      margin-right: 40px;
      margin-bottom: 10px;
    }
    .time, .place{
      font-size: 16px;
      font-weight: 900;
      .fa-icon{
        margin-right: 10px;
      }
    }
  }
  .cld{
    background-color: #fff;
    padding: 20px 20px 0 20px;
    h2{
      color: $main-blue;
      margin: 0;
      position: absolute;
      width: 50%;

    }
    hr{
      border: 0;
      height: 1px;
      background: #e6e6e6;
      margin-top: 20px;
      margin-bottom: 0;
    }
  }
  .lst{    
    background-color: #fff;
    padding: 20px;
    h2{
      color: $main-blue;
      margin: 0 0 10px 0;
    }

    img{
      width: 200px;
    }
  }

  
}

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