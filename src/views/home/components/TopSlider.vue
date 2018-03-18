<template>
<div class="slidertop-wrapper">  
  <div class="swiper-nav">
    <div class="swiper-button-prev" slot="button-prev"><svg-icon icon-class="arrow_left"></svg-icon></div>  
    <div class="swiper-button-next" slot="button-next"><svg-icon icon-class="arrow_right"></svg-icon></div>
  </div>
  <swiper :options="swiperOption" class="swiper-box">
    <swiper-slide v-for="item in idata" :key="item.id" class="swiper-item">
      <img :src="item.img">
    </swiper-slide>
    
  </swiper>
  
  
</div>

</template>

<script>
// import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  name: 'TopSlider',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 30,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        // Responsive breakpoints
        breakpoints: {
          // when window width is <= 320px
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          },
          // when window width is <= 480px
          480: {
            slidesPerView: 2,
            spaceBetween: 10
          },
          // when window width is <= 640px
          640: {
            slidesPerView: 3,
            spaceBetween: 20
          }
        }
      },
      idata: [
        {
          'id': 1,
          'img': 'static/upload/images/1.jpg',
          'url': '#',
          'section_name': 'Section 1',
          'title': 'Menikmati Hari Pertama Car Free Day di JLNT Antasari',
          'teaser': 'Posted by Kevin on Friday'
        },
        {
          'id': 2,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 2',
          'title': 'Muntahkan Lahar, Gunung Mayon Siap Meletus',
          'teaser': 'Posted by Kevin on Friday'
        },
        {
          'id': 3,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 3',
          'title': 'Ribuan Nelayan Minta Kejelasan Terkait Penggunaan Cantrang',
          'teaser': 'Posted by Kevin on Friday'
        },
        {
          'id': 4,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Sepeda Federal Vintage',
          'teaser': 'Posted by Kevin on Friday'
        },
        {
          'id': 5,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Timnas Islandia Raih Kemenangan Atas Timnas Indonesia',
          'teaser': 'Posted by Kevin on Friday'
        },
        {
          'id': 6,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Saksi Seret Nama SBY dalam Sidang Korupsi e-KTP Setya Novanto',
          'teaser': 'Saksi Seret Nama SBY dalam Sidang Korupsi e-KTP Setya Novanto'
        },
        {
          'id': 7,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'SMP Darul Hikam Gelar Try Out Ujian Nasional (UN) SD/MI 2017',
          'teaser': 'SMP Darul Hikam Gelar Try Out Ujian Nasional (UN) SD/MI 2017'
        },
        {
          'id': 8,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Persela Lamongan Imbangi Bhayangkara FC',
          'teaser': 'Posted by Kevin on Friday'
        },
        {
          'id': 9,
          'img': 'static/upload/images/2.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Panglima TNI : Pengiriman Satgas Kesehatan TNI Sesuai Konstitusi',
          'teaser': 'Posted by Kevin on Friday'
        }
      ]
    }
  }
}
console.log('top slider main')
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.slidertop-wrapper{  
  // padding: 20px 0;
  width: 100%;
  margin: 0 auto;
}
.swiper-box {
  width: 86%;
  height: 130px;
  margin: 0 auto;
  
}
.swiper-item {
  height: 100%;
  text-align: center;  
  // background: #fff;
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
    img{
      width: 100%;
      height: auto;      
    }
}
.swiper-nav{
  position: relative;  
  
  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}
.swiper-button-next, .swiper-button-prev{  
  background-image: none;  
  font-size: 36px;
  margin-top: 50px; 
}
.swiper-button-next{  
  right: 20px;
  left: auto; 
}

</style>