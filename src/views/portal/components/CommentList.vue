<template>
  <div class="comment-list">      
    <div  class="content">
        <el-row :gutter="20" v-for="(comment, index) in comments" :key="comment.id" >
            <el-row >
              <el-col :span="1" class="comment-img">
                  <img :src="comment.user.image" class="img-circle img-mini v-align-middle"/>
              </el-col>
              <el-col :span="23" class="comment-info">
                  <div> {{ comment.user.name }}</div>
                  <div class="comment-date"> {{ comment.comment_date }} </div>
              </el-col>
            </el-row>
            <el-row class="comment-comment">
              <el-col >
                  <p> {{ comment.comment }}</p>
              </el-col>
            </el-row>
            <el-row >
              <el-col >
                  <hr/>
              </el-col>
            </el-row>          
            <el-row >
              <el-col :span="12" class="comment-option" >
                <span> <v-icon name="heart" base-class="icon-20 v-align-middle"></v-icon> </span>
                <span class="opt-label"> {{ comment.likes_count}} </span>
                <span class="opt-label"> | </span>
                <span class="opt-label"> Reply </span>
              </el-col>
              <el-col :span="12" class="align-right">
                  <span> <v-icon name="more-horizontal" base-class="icon-20"></v-icon> </span>
              </el-col>
            </el-row> 
        </el-row>
        <el-row :gutter="20" class="m-t-10 p-r-20">
            <el-col class="align-right">
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>

export default {
  name: 'CommentList',
  data() {
    return {
      comments: [
        {
          id: 1,
          comment: 'Test komentar',
          comment_date: 'Sabtu 25 Oktober 2017, 13:20',
          parent_id: null,
          user: {
            id: '1',
            name: 'Melanie',
            role: 'user',
            image: 'static/upload/images/profile-user.jpg'
          },
          likes_count: 0
        }
      ]
    }
  },
  created() {
    console.log('comment box Detail')
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/comment-list.scss";

</style>
