<template>
  <div class="comment-list">      
    <div  class="content" v-loading="loading.comments" > 
        <el-row :gutter="20" v-for="(comment) in comments" :key="comment.id" class="data">
            <el-row >
              <el-col :span="1" class="comment-img">
                  <img :src="comment.user.image" class="img-circle img-mini v-align-middle"/>
              </el-col>
              <el-col :span="23" class="comment-info">
                  <div> {{ comment.user.name }}</div>
                  <div class="comment-date"> <timeago :auto-update="60" :since="comment.created_at"> </timeago>  </div>
              </el-col>
            </el-row>
            <el-row class="comment-comment">
              <el-col >
                  <p> {{ comment.comments }}</p>
              </el-col>
            </el-row>
            <el-row >
              <el-col >
                  <hr/>
              </el-col>
            </el-row>          
            <el-row >
              <el-col :span="12" class="comment-option" >
                <span> <bb-love :articleID="comment.id" :type="'comment'" ></bb-love> </span>
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
import { getCommentsByArticleID } from '@/api/comment'
import BbLove from '@/views/portal/components/BbLove'
import EventBus from '@/utils/event-bus'

export default {
  name: 'CommentList',
  props: {
    articleID: { type: String },
    limit: { default: 12, type: Number }
  },
  components: {
    BbLove
  },
  data() {
    return {
      comments: [],
      loading: {
        comments: false
      }
    }
  },
  created() {
    this.init()
  },
  mounted() {
    EventBus.$on('UPDATE_COMMENTS_EVENT', event => {
      this.getComments(this.articleID)
    })
    EventBus.$on('SET_ARTICLE_ID_COMMENTS_EVENT', event => {
      if (!this.articleID) {
        this.getComments(event.articleID)
      }
    })
  },
  methods: {
    init() {
      console.log(this.articleID)
      this.getComments(this.articleID)
    },
    getComments(articleID) {
      this.loading.comments = true
      if (articleID) {
        getCommentsByArticleID({ articleID }).then(response => {
          console.log('get comments')
          if (response) {
            this.comments = response.data
          }
          this.loading.comments = false
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/comment-list.scss";

</style>
