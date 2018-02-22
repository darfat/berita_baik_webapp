<template>
<div class="comment-box">
    <div class="content">
        <el-row :gutter="20" >
            <el-col :span="1" >
                <img :src="userLogin.image" class="img-circle img-mini v-align-middle"/>
            </el-col>
            <el-col :span="23" >
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="Comments..."
                    >
                    </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="m-t-10 p-r-20">
            <el-col class="align-right">
                  <el-button type="primary" plain>Post</el-button>
            </el-col>
        </el-row>
    </div>

</div>
</template>


<script>
export default {
  name: 'ArticleNav',
  data() {
    return {
      userLogin: {
        id: '1',
        name: 'Melanie',
        role: 'user',
        image: 'static/upload/images/profile-user.jpg'
      }
    }
  },
  created() {
    console.log('comment box Detail')
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/comment-box.scss";


</style>