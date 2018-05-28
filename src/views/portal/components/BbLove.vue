<template>
<span>
  <a class="love" v-on:click="loveUnLove" v-if="scale === 1" >      
    <v-icon name="heart" base-class="icon-20 love-me" v-show="state === true"  ></v-icon> 
    <v-icon name="heart" base-class="icon-20 hate-me" v-show="state === false" ></v-icon> 
  </a>
  <a class="love" v-on:click="loveUnLove" v-else >      
    <v-icon name="heart" base-class="icon-24 love-me" v-show="state === true"  ></v-icon> 
    <v-icon name="heart" base-class="icon-24 hate-me" v-show="state === false" ></v-icon> 
  </a>
</span>
</template>

<script>
import { articleLikeUnlike, getArticleLoveState } from '@/api/article'
import { mapGetters } from 'vuex'

export default {
  name: 'BbLove',
  props: {
    articleID: { type: String },
    type: { type: String },
    scale: { type: Number, default: 1 }
  },
  computed: {
    ...mapGetters([
      'name',
      'user_id'
    ])
  },
  data() {
    return {
      state: false,
      loveClass: 'icon-20',
      loading: {
        love: false
      },
      articleLike: {}
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      if (this.user_id) {
        this.getLoveState()
      }
    },
    getLoveState() {
      const data = {
        user_id: this.user_id,
        article_id: this.articleID
      }
      getArticleLoveState(data).then(response => {
        if (response && response.data) {
          this.state = response.data.liked === 'true'
        }
      })
    },
    loveUnLove() {
      if (this.user_id) { // login name
        if (this.state) {
          this.state = false
          this.loveClass = 'love-red'
        } else {
          this.state = true
          this.loveClass = 'icon-20'
        }
        this.articleLike = {
          liked: this.state,
          user_id: this.user_id,
          article_id: this.articleID
        }
        articleLikeUnlike(this.articleLike).then(response => {
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
 @import "src/styles/love.scss";

</style>