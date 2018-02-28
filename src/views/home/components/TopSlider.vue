<template>
<div class="slidertop-wrapper">
  <el-carousel :interval="4000" type="card" height="200px" indicator-position="none">
    <el-carousel-item v-for="item in idata" :key="item.id">
      <div class="item-wrapper">
      <router-link :to="{ path: '/article/indonesia-baik/my-slug' }">
        <img :src="imgpath+item.img" class="image">
        <div class="section">{{item.section_name}}</div>
        <div class="title"><h3>{{item.title}}</h3></div>
      </router-link>
      </div>
    </el-carousel-item>
  </el-carousel>
</div>
</template>

<script>
console.log('top slider main')
export default {
  name: 'TopSlider',
  data() {
    return {
      imgpath: 'static/',
      idata: [
        {
          'id': 1,
          'img': 'images/01.jpg',
          'url': '#',
          'section_name': 'Section 1',
          'title': 'Menikmati Hari Pertama Car Free Day di JLNT Antasari',
          'teaser': 'Posted by Kevin on Friday',
          'isActive': true
        },
        {
          'id': 2,
          'img': 'images/02.jpg',
          'url': '#',
          'section_name': 'Section 2',
          'title': 'Muntahkan Lahar, Gunung Mayon Siap Meletus',
          'teaser': 'Posted by Kevin on Friday',
          'isActive': false
        },
        {
          'id': 3,
          'img': 'images/03.jpg',
          'url': '#',
          'section_name': 'Section 3',
          'title': 'Ribuan Nelayan Minta Kejelasan Terkait Penggunaan Cantrang',
          'teaser': 'Posted by Kevin on Friday',
          'isActive': false
        },
        {
          'id': 4,
          'img': 'images/04.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Sepeda Federal Vintage',
          'teaser': 'Posted by Kevin on Friday',
          'isActive': false
        },
        {
          'id': 5,
          'img': 'images/05.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Timnas Islandia Raih Kemenangan Atas Timnas Indonesia',
          'teaser': 'Posted by Kevin on Friday',
          'isActive': false
        },
        {
          'id': 6,
          'img': 'images/06.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Saksi Seret Nama SBY dalam Sidang Korupsi e-KTP Setya Novanto',
          'teaser': 'Saksi Seret Nama SBY dalam Sidang Korupsi e-KTP Setya Novanto',
          'isActive': false
        },
        {
          'id': 7,
          'img': 'images/07.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'SMP Darul Hikam Gelar Try Out Ujian Nasional (UN) SD/MI 2017',
          'teaser': 'SMP Darul Hikam Gelar Try Out Ujian Nasional (UN) SD/MI 2017',
          'isActive': false
        },
        {
          'id': 8,
          'img': 'images/08.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Persela Lamongan Imbangi Bhayangkara FC',
          'teaser': 'Posted by Kevin on Friday',
          'isActive': false
        },
        {
          'id': 9,
          'img': 'images/09.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Panglima TNI : Pengiriman Satgas Kesehatan TNI Sesuai Konstitusi',
          'teaser': 'Posted by Kevin on Friday',
          'isActive': false
        }
      ]
    }
  }
}
</script>

<style>
.slidertop-wrapper{
  padding: 20px 0;
}  
/*
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;    
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
*/



.image{
  width: 100%;
  min-height: 200px;    
}


.section{
  position: absolute;
  top: 3%;
  left: 3%;
  text-align: center;
  color: #FFF;
  font-weight: bold;
  background-color: #0a2f88;
  padding: 5px 15px;
}


.title{
	position:absolute; /* absolute position (so we can position it where we want)*/
	bottom:2%; /* position will be on bottom */
	left:1%;
	width:98%;
	/* styling bellow */
	background-color: rgba(255,255,255, 0.9);
	color:#0a2f88;
  font-height:700;  
}

.title h3{
    padding:10px 15px;
    margin:0;    
}
</style>