<template>
  <el-carousel indicator-position="outside">
    <el-carousel-item v-for="item in headline" :key="item.id">      
      <img :src="imgpath+item.img">
    </el-carousel-item>
  </el-carousel>
</template>

<script>
console.log('headline slider main')
export default {
  name: 'HeadlineSlider',
  data() {
    return {
      imgpath: '../../../static/',
      headline: [
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
  .el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>