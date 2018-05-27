<template>
  <div class="about">
    <div class="big-img">
      <img :src="img" alt="">
    </div>
    <div class="container desc">
      <h1>Tentang Kami</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dignissim vel diam eu ultrices. Nulla id neque quis nunc mattis tempus ultricies id purus. Nulla maximus ex a congue pellentesque. Praesent vel risus et erat imperdiet sagittis eget at metus. Suspendisse dapibus faucibus sapien vel porta. Donec pulvinar porta erat, id faucibus risus aliquet ac. Ut vitae viverra dui. Maecenas nec maximus quam. Vivamus mollis ultrices est ut blandit. Donec eu vehicula nunc.</p>
      <p>Vivamus convallis viverra lobortis. Donec pharetra sapien nec aliquet vulputate. Vivamus fermentum eu lorem a ornare. Sed sagittis erat dui, sit amet malesuada arcu tristique quis. Sed mattis pharetra nisi id euismod. In diam nunc, ultricies sed justo in, facilisis congue nulla. Nulla ornare elit ut malesuada lacinia. Proin fermentum malesuada ex, ut vehicula ante volutpat sed. Pellentesque volutpat semper urna, hendrerit venenatis velit ornare in. Suspendisse posuere mauris sed leo commodo, eu aliquam augue consectetur. Pellentesque sed urna vitae lacus congue malesuada. Aenean eget risus a ex convallis tempus nec eget massa.</p>
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
            Jl Banten No. 01<br>
            T. 022-5737331 F. 87853266<br>
            Bandung 10210<br>
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
        { id: '3', name: 'XXX', title: 'Editor in Chief', image: 'static/images/avatar/m03.png', url: '' },
        { id: '4', name: 'Darwin', title: 'Creative Director / Video Editor', image: 'static/images/avatar/m02.png', url: '' },
        { id: '5', name: 'Annisa', title: 'Administration Coordinator', image: 'static/images/avatar/f03.png', url: '' },
        { id: '6', name: 'XXX', title: 'Writer', image: 'static/images/avatar/m04.png', url: '' },
        { id: '7', name: 'XXX', title: 'Writer', image: 'static/images/avatar/m05.png', url: '' },
        { id: '8', name: 'XXX', title: 'Writer', image: 'static/images/avatar/f04.png', url: '' },
        { id: '9', name: 'XXX', title: 'Web Developer', image: 'static/images/avatar/m06.png', url: '' },
        { id: '10', name: 'XXX', title: 'Front-end Developer', image: 'static/images/avatar/f07.png', url: '' },
        { id: '11', name: 'XXX', title: 'Social Media Specialist', image: 'static/images/avatar/f08.png', url: '' },
        { id: '12', name: 'XXX', title: 'Designer', image: 'static/images/avatar/m09.png', url: '' }
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
  }
}
</style>