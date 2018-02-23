<template>
  <div class="ln-wrapper">
    <el-row :gutter="20">
        <el-col :span="24">Berita Baik Terkini</el-col>
        <!--<el-col :span="12" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 0 : 0" style="margin-bottom:20px;">-->
        <el-col :span="12" v-for="item in idata" :key="item.id" style="margin-bottom:20px;">  
        <el-card :body-style="{ padding: '0' }">
        <img :src="imgpath+item.img">
        <div style="padding: 14px;">
            <span>{{item.title}}</span>
            <time class="time">{{ currentDate }}</time>
            <div class="bottom clearfix">            
            <el-button type="text" class="button"><i class="el-icon-share"></i></el-button>
            <el-button type="text" class="button">Like</el-button>
            </div>
        </div>
        </el-card>
        </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentDate: new Date(),
      imgpath: '../../../static/',
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
        }
      ]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.time {
    font-size: 13px;
    color: #999;
  }
  
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
</style>