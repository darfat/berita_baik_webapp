<template>
  <div class="about">
    <div class="big-img">
      <img :src="img" alt="">
    </div>
    <div class="container desc">
      <h1>Tentang Kami</h1>
      <p>Indonesia adalah negara yang kaya dan ramah. Sepenggal kalimat ini menunjukkan bahwa negeri ini patut untuk dibanggakan di mata rakyatnya sendiri.  Dengan semangat ini, <b>beritabaik.id</b> lahir untuk mengapresiasi segala macam kebaikan dan prestasi Indonesia sekecil apapun.</p>
      <p>Di bawah PT. Warta Milenial Indonesia (WMI), Beritabaik.id adalah portal berita yang mengusung gaya positive journalism. Informasi yang kami suguhkan lebih banyak membicarakan tentang prestasi dan kebaikan-kebaikan skala besar maupun kecil dari seluruh penjuru nusantara. Karena kami yakin dan percaya, masih banyak hal-hal positif di negeri ini yang belum terberitakan.</p>
      <p>Dengan konten-konten informasi bernada positif, <b>beritabaik.id</b> tidak bermaksud untuk menghilangkan sisi kritis masyarakat. Kehadiran kami justru ingin menjadi penyeimbang sekaligus penyegar informasi di tengah kejenuhan masyarakat terhadap jumlah berita bernada negatif di sejumlah media massa ternama di Indonesia yang masih mendominasi arus informasi publik.</p>
      <p>Beritabaik.id memiliki visi untuk menjadi media massa nasional yang secara khusus mengangkat isu-isu positif di seluruh penjuru Indonesia, serta mengubah pola pikir skeptis dan pratirasa terhadap kondisi sosial, ekonomi hingga politik di Indonesia, khususnya pada level generasi milenial dan generasi Z, agar generasi berikutnya memiliki cara pandang yang lebih positif.</p>
      <p>Mari berbagi kebaikan bersama Beritabaik.id. Karena kebaikan sekecil apapun menjadi lebih berarti ketika dihargai</p>
    </div>
    <div class="team">
      <div class="container">
        <h1>Tim Kami</h1>
        <el-row :gutter="20">
          <el-col :xs="12" :sm="6" v-for="(item) in team" :key="item.id" class="box">
            
            <el-card :body-style="{ padding: '0px' }">
              <div class="image">
                <img :src="item.image" :alt="item.name">
              </div>
              <div class="info">
                <p class="name">{{item.name}}</p>
                <p class="title">{{item.title}}</p>
              </div>
            </el-card>

          </el-col>
        </el-row>
      </div>  
    </div>
    <div class="container contact">
      <h1>Hubungi Kami</h1>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="8">
          <address>
            <h2>Bandung</h2>
            Jl. Cigadung Raya Barat no.5<br>
            Bandung, Jawa Barat, 40191<br>
            Indonesia<br>
          </address>
        </el-col>
        <el-col :xs="24" :sm="8">
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
  background-color: #fff;  
  .big-img{
    // padding-bottom: 20px;
    img{
      width: 100%;
    }
  }
  .desc{
    // padding-bottom: 20px;
  }
  .team{
    padding: 20px 0 0 0;
    background-color: #e6e6e6;    
    .el-card{
      margin-bottom: 20px;
      background-color: #e6e6e6;
      border: none;
      box-shadow: none;
      .image{
        display: block;
        text-align: center;        
        width: 100%;
        padding: 10px;
        border: 1px solid #999;
        border-radius: 5px;
        img{
          border-radius: 50%;
          width: 100%;
        }
        
      }
      .info{
        text-align: center;
        padding: 15px 10px;
        p{
          text-align: center;
          margin: 0; padding: 0;
          line-height: 1em;
        }
        .name{
          font-weight: 700;
        }
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
    padding-bottom: 20px;
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

@media all and (max-width : 430px) {
  .about{    
    .desc{
      font-size: 0.9em;
    }
    .team{
      padding: 20px 0;
      background-color: #e6e6e6;
      .el-card{        
        font-size: 0.8em;
        min-height: 190px;        
        .image{
          
        }
        .info{
          padding: 10px 5px;
          p{            
            font-size: 0.9em;
            line-height: 1.1em;
          }
        }
      }
    }
    .contact{
      padding-bottom: 20px;
      font-size: 0.9em;
    }
    .email{      
      .el-button{        
        font-size: 0.9em;
      }    
    }
    .map{
      padding-bottom: 20px;
      &-box{
        width: 100%;
        min-height: 200px;
        background-color: #eee;
      }
    }
    h1{
      font-size: 1.4em;
    }
    h2{
      margin: 10px 0 0 0;      
      font-size: 1.1em;
    }
  }
}
</style>