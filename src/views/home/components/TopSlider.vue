<template>
<div class="slidertop-wrapper">
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="item in idata" :key="item.id">
      <div class="item-wrapper">
      <img :src="imgpath+item.img" class="image">
      <div class="section">{{item.section_name}}</div>
      <div class="title">{{item.title}}</div>
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
  padding-top: 20px;
  background-color: rgba(238, 238, 238, 0.226);

  .el-carousel__item h3 {    
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
}


.item-wrapper{
  position: relative;  
  width: 100%; 
}

.image{
  width: 100%;
}

.title {    
    position: absolute;
    top: 100px;
    left: 0;
}

.section{
  position: absolute;
    top: 3%;
    left: 3%;
    // transform: translate( -50%, -50% );
    text-align: center;
    color: white;
    font-weight: bold;
    background-color: #0a2f88;
    padding-left: 15px;
    padding-right: 15px;
}
</style>