<template>
  <div class="about">
    <div class="big-img">
      <img :src="img" alt="">
    </div>
    <div class="container desc">
      <h1>Tentang Kami</h1>
      <p align="justity">Indonesia adalah negara yang kaya dan ramah. Sepenggal kalimat ini menunjukkan bahwa negeri ini patut untuk dibanggakan di mata rakyatnya sendiri.  Dengan semangat ini, <b>beritabaik.id</b> lahir untuk mengapresiasi segala macam kebaikan dan prestasi Indonesia sekecil apapun.</p>
      <p align="justity">Di bawah PT. Warta Milenial Indonesia (WMI), Beritabaik.id adalah portal berita yang mengusung gaya positive journalism. Informasi yang kami suguhkan lebih banyak membicarakan tentang prestasi dan kebaikan-kebaikan skala besar maupun kecil dari seluruh penjuru nusantara. Karena kami yakin dan percaya, masih banyak hal-hal positif di negeri ini yang belum terberitakan.</p>
      <p align="justity">Dengan konten-konten informasi bernada positif, <b>beritabaik.id</b> tidak bermaksud untuk menghilangkan sisi kritis masyarakat. Kehadiran kami justru ingin menjadi penyeimbang sekaligus penyegar informasi di tengah kejenuhan masyarakat terhadap jumlah berita bernada negatif di sejumlah media massa ternama di Indonesia yang masih mendominasi arus informasi publik.</p>
      <p align="justity">Beritabaik.id memiliki visi untuk menjadi media massa nasional yang secara khusus mengangkat isu-isu positif di seluruh penjuru Indonesia, serta mengubah pola pikir skeptis dan pratirasa terhadap kondisi sosial, ekonomi hingga politik di Indonesia, khususnya pada level generasi milenial dan generasi Z, agar generasi berikutnya memiliki cara pandang yang lebih positif.</p>
      <p align="justity">Mari berbagi kebaikan bersama Beritabaik.id. Karena kebaikan sekecil apapun menjadi lebih berarti ketika dihargai</p>
    </div>
    <div class="team">
      <div class="container">
        <h1>Tim Kami</h1>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item) in team" :key="item.id" class="box">
            
            <el-card :body-style="{ padding: '0px' }">
              <img :src="item.image" class="image">
              <div style="padding: 14px; text-align: center">
                <span>{{item.name}}</span>
                <div class="bottom clearfix">
                <span>{{item.title}}</span>
                  
                </div>
              </div>
            </el-card>

          </el-col>
        </el-row>
      </div>  
    </div>
    <div class="container contact">
      <h1>Hubungi Kami</h1>
      <el-row :gutter="20">
        <el-col :span="6">
          <address>
            <h2>Bandung</h2>
            Jl. Cigadung Raya Barat no.5<br>
            Bandung, Jawa Barat, 40191<br>
            Indonesia<br>
          </address>
        </el-col>
        <el-col :span="6">
          <address>
            <h2>Redaksi</h2>
            <a href="mailto:redaksi@beritabaik.id">redaksi@beritabaik.id</a>.<br>
            <h2>Bisnis dan Kerjasama</h2>
            <a href="mailto:partnership@beritabaik.id">partnership@beritabaik.id</a>.<br> 
          </address>
        </el-col>
      </el-row>
      <div class="email"><el-button >Kirim kami Email</el-button></div>
    </div>
    
    <div class="container map">
      <h1>Peta Lokasi</h1>
      <div class="map-box">
        <GmapMap
          :center="{lat:-6.871069, lng:107.622433}"
          :zoom="16"
          map-type-id="terrain"
          style="width: 1004px; height: 400px"
        >
          <GmapMarker
            :key="index"
            v-for="(m, index) in markers"
            :position="m.position"
            :clickable="true"
            :draggable="true"
            @click="center=m.position"
          />
        </GmapMap>
      </div>
    </div>
  </div>

</template>

<script>

export default {
  name: 'AboutUs',
  data() {
    return {
      img: 'static/images/us.jpg',
      team: [
        { id: '1', name: 'Boim', title: 'Chief Executive Officer', image: 'static/images/avatar/m01.png', url: '' },
        { id: '2', name: 'Avitia', title: 'Editor in Chief', image: 'static/images/avatar/f01.png', url: '' },
        { id: '3', name: '-', title: 'Editor in Chief', image: 'static/images/avatar/m03.png', url: '' },
        { id: '4', name: 'Darwin', title: 'Creative Director / Video Editor', image: 'static/images/avatar/m02.png', url: '' },
        { id: '5', name: 'Annisa', title: 'Administration Coordinator', image: 'static/images/avatar/f03.png', url: '' },
        { id: '6', name: 'Haris', title: 'Content Writer', image: 'static/images/avatar/m04.png', url: '' },
        { id: '7', name: 'Asep', title: 'Fotografer', image: 'static/images/avatar/m05.png', url: '' },
        { id: '8', name: 'Tya', title: 'Editor', image: 'static/images/avatar/f04.png', url: '' },
        { id: '9', name: '-', title: 'Web Developer', image: 'static/images/avatar/m06.png', url: '' },
        { id: '10', name: '-', title: 'Front-end Developer', image: 'static/images/avatar/f07.png', url: '' },
        { id: '11', name: '-', title: 'Social Media Specialist', image: 'static/images/avatar/f08.png', url: '' },
        { id: '12', name: '-', title: 'Designer', image: 'static/images/avatar/m09.png', url: '' }
      ],
      markers: [{
        position: {
          lat: -6.871069,
          lng: 107.622433
        }
      }
      ]
    }
  },
  created() {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/variables.scss";
.about{
  .big-img{
    padding-bottom: 20px;
    img{
      width: 100%;
    }
  }
  .desc{
    padding-bottom: 20px;
  }
  .team{
    padding: 20px 0;
    background-color: #eee;    
    .el-card{
      margin-bottom: 20px;
      background-color: #eee;
      border: none;
      box-shadow: none;
      .image{
        display: block;
        text-align: center;        
        width: 100%;
        padding: 10px;
        border: 1px solid #999;
        border-radius: 5px;
      }
    }
  }
  .contact{
    padding-bottom: 20px;
  }
  .email{
    padding: 20px 0;
    .el-button{
      background-color: $main-blue;
      color: #fff;
      border: 1px solid #eee;
    }    
  }
  .map{
    // padding: 20px 0;
    &-box{
      width: 100%;
      min-height: 400px;
      background-color: #eee;
    }
  }
  h1{
    color: $main-blue;
  }
  h2{
    margin: 0;
    line-height: 1.5em;
  }
  p{
    line-height: 1.5em;
    text-align: justify;
  }
}
</style>