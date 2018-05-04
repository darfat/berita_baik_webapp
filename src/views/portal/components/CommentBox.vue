<template>
<div class="comment-box">
    <div class="content">
        <el-row :gutter="20" >
            <el-col :xs="3" :sm="3">
              <div class="img-mini">
                <img :src="userLogin.image" class="img-circle v-align-middle"/>
              </div>
            </el-col>
            <el-col :xs="21" :sm="21">
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="Tulis Komentarmu..."
                    v-model="comment"
                    >
                    </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="0" class="m-t-10">
            <el-col class="align-right">
                  <el-button type="primary" plain @click="postComment">Post</el-button>
            </el-col>
        </el-row>
    </div>
    <!-- <div class="content" v-if="!name">
      <div class="disabled-lbl"> <i> Silahkan login terlebih dahulu untuk memberikan komentar </i></div>
    </div> -->
</div>
</template>


<script>
import EventBus from '@/utils/event-bus'
import { create } from '@/api/comment'
import { mapGetters } from 'vuex'

export default {
  name: 'CommentBox',
  props: {
    articleID: { type: String }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      comment: '',
      userLogin: {
        id: '00000000-0000-0000-0000-000000000001',
        name: 'Anonymous',
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
          EventBus.$emit('UPDATE_COMMENTS_EVENT', data)
          this.comment = ''
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