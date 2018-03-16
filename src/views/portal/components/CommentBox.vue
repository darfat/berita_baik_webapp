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
                    placeholder="Tulis Komentarmu..."
                    v-model="comment"
                    >
                    </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="20" class="m-t-10 p-r-20">
            <el-col class="align-right">
                  <el-button type="primary" plain @click="postComment">Post</el-button>
            </el-col>
        </el-row>
    </div>
</div>
</template>


<script>
import EventBus from '@/utils/event-bus'
import { create } from '@/api/comment'

export default {
  name: 'CommentBox',
  props: {
    articleID: { type: String }
  },
  data() {
    return {
      comment: '',
      userLogin: {
        id: '00000000-0000-0000-0000-000000000003',
        name: 'Melanie',
        role: 'user',
        image: 'static/upload/images/profile-user.jpg'
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    },
    postComment() {
      const data = {
        'article_id': this.articleID,
        'user_id': this.userLogin.id,
        'comments': this.comment,
        'active': true,
        'likes_count': 0
      }
      console.log('post comment')
      console.log(data)
      create(data)
        .then(response => {
          console.log('comment created!')
          EventBus.$emit('UPDATE_COMMENTS_EVENT', data)
        })
        .catch(error => {
          console.log(error)
        })
    }

  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/comment-box.scss";


</style>