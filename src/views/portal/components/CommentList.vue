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
                <!-- <span class="opt-label"> | </span>
                <span class="opt-label"> Reply </span> -->
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
        <div  v-if="comments && comments.length === 0">
          <div class="comments-no"> <i> Belum ada komentar </i></div>
        </div>
    </div>
    <div class="comments-paging" v-if="comments && comments.length  > 0">
      <el-pagination
        background
        layout="prev, pager, next"
        prev-text="Sebelumnya" next-text="Selanjutnya"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="per_page"
        :total="total_entries_size"  
      >
      </el-pagination>
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
      },
      per_page: 5,
      page: 1,
      total_pages: 1,
      total_entries_size: 0
    }
  },
  created() {
    this.init()
  },
  mounted() {
    EventBus.$on('UPDATE_COMMENTS_EVENT', event => {
      this.getComments(this.articleID, this.page)
    })
    EventBus.$on('SET_ARTICLE_ID_COMMENTS_EVENT', event => {
      if (!this.articleID) {
        this.getComments(event.articleID, this.page)
      }
    })
  },
  methods: {
    init() {
      this.getComments(this.articleID, this.page)
    },
    getComments(articleID, page) {
      if (articleID) {
        this.loading.comments = true
        const params = {
          articleID,
          page,
          per_page: this.per_page
        }
        getCommentsByArticleID(params).then(response => {
          if (response) {
            this.comments = response.data.data
            this.per_page = response.data.per_page
            this.total_pages = response.data.total_pages
            this.total_entries_size = response.data.total_entries_size
            this.page = response.data.page
          }
          this.loading.comments = false
        })
      }
    },
    handleCurrentChange(page) {
      this.getComments(this.articleID, page)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/comment-list.scss";

</style>
