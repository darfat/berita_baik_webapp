<template>
<div class="comment-box">
    <div class="content">
        <el-row >
            <el-col :xs="4" :sm="3" class="content-img">
              <div class="img-mini">
                <img v-if="name && userLogin.image " :src="userLogin.image" class="img-circle v-align-middle"/>
                <img v-else src="static/images/avatar/no_avatar.png" class="img-circle v-align-middle"/>
              </div>
            </el-col>
            <el-col :xs="20" :sm="21" class="content-comment">
                <el-input
                    type="textarea"
                    :rows="5"
                    placeholder="Tulis Komentarmu..."
                    v-model="comment"
                    :maxlength="250"
                    >
                    </el-input>
            </el-col>
        </el-row>
        <el-row :gutter="0" class="m-t-10">
            <el-col class="align-right">
                  <el-button plain @click="postComment">Kirim</el-button>
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
      'user_id',
      'role',
      'image'
    ])
  },
  data() {
    return {
      comment: '',
      userLogin: {
        image: 'static/images/avatar/no_avatar.png'
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.userLogin.id = this.user_id
      this.userLogin.name = this.name
      this.userLogin.role = this.role
      if (this.image) {
        this.userLogin.image = this.image
      }
    },
    postComment() {
      if (this.user_id) { // login name
        const data = {
          'article_id': this.articleID,
          'user_id': this.userLogin.id,
          'comments': this.comment,
          'active': true,
          'likes_count': 0
        }
        create(data)
          .then(response => {
            EventBus.$emit('UPDATE_COMMENTS_EVENT', data)
            this.comment = ''
          })
          .catch(error => {
            console.log(error)
          })
      } else {
        this.$router.push({
          path: '/login'
        })
      }
    }

  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/comment-box.scss";


</style>