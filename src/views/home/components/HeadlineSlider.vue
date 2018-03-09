<template>
  <el-carousel indicator-position="outside" height="560px">
    <el-carousel-item v-for="item in headline" :key="item.id">
      <div class="item-wrapper-hl">
        <img :src="imgpath+item.img" class="image-hl">
        <div class="section-hl">{{item.section_name}}</div>        
      </div>
      <div class="bottom-caption">
      <span> <bb-love></bb-love> </span>
      <span> <v-icon name="share-2" base-class="icon-20"></v-icon> </span>
      <h2>{{item.title}}</h2>
      <p>{{item.teaser}}</p>
      <span class="separator">&nbsp;&nbsp;&nbsp;&nbsp;</span>
      Boim | 5 menit yang lalu
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
import BbLove from '@/views/portal/components/BbLove'
export default {
  name: 'HeadlineSlider',
  components: {
    BbLove
  },
  data() {
    return {
      imgpath: 'static/',
      headline: [
        {
          'id': 1,
          'img': 'images/01.jpg',
          'url': '#',
          'section_name': 'Section 1',
          'title': 'Menikmati Hari Pertama Car Free Day di JLNT Antasari',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': true
        },
        {
          'id': 2,
          'img': 'images/02.jpg',
          'url': '#',
          'section_name': 'Section 2',
          'title': 'Muntahkan Lahar, Gunung Mayon Siap Meletus',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        },
        {
          'id': 3,
          'img': 'images/03.jpg',
          'url': '#',
          'section_name': 'Section 3',
          'title': 'Ribuan Nelayan Minta Kejelasan Terkait Penggunaan Cantrang',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        },
        {
          'id': 4,
          'img': 'images/04.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Sepeda Federal Vintage',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        },
        {
          'id': 5,
          'img': 'images/05.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Timnas Islandia Raih Kemenangan Atas Timnas Indonesia',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        },
        {
          'id': 6,
          'img': 'images/06.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Saksi Seret Nama SBY dalam Sidang Korupsi e-KTP Setya Novanto',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        },
        {
          'id': 7,
          'img': 'images/07.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'SMP Darul Hikam Gelar Try Out Ujian Nasional (UN) SD/MI 2017',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        },
        {
          'id': 8,
          'img': 'images/08.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Persela Lamongan Imbangi Bhayangkara FC',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        },
        {
          'id': 9,
          'img': 'images/09.jpg',
          'url': '#',
          'section_name': 'Section 4',
          'title': 'Panglima TNI : Pengiriman Satgas Kesehatan TNI Sesuai Konstitusi',
          'teaser': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...',
          'isActive': false
        }
      ]
    }
  }
}
</script>

<style>
.el-carousel__item{
  background-color: #FFF;
}
.image-hl{
  width: 100%;
  max-height: 400px;    
}


.section-hl{
  position: absolute;
  top: 5%;
  left: 3%;
  text-align: center;
  color: #FFF;
  font-weight: bold;
  background-color: #0a2f88;
  padding: 5px 15px;
}


.bottom-caption{	
	width:100%;
  padding:10px 15px;	  
}

.bottom-caption h2{    
  line-height: 0.03em;
}

.separator {
    background-color: #fbdd01;
    width: 1.5em;
    height: 0.8em;
    margin-top: 5px;
    margin-bottom: 5px;
}

</style>