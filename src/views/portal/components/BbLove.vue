<template>
  <a class="love" v-on:click="loveUnLove" >      
       <v-icon name="heart" base-class="icon-20 love-me" v-show="state === true"  ></v-icon> 
       <v-icon name="heart" base-class="icon-20 hate-me" v-show="state === false" ></v-icon> 
  </a>
</template>

<script>
// import { getArticle } from '@/api/article'

export default {
  name: 'BbLove',
  props: {
    param: { type: String },
    articleID: { type: String, default: '000' }
  },
  data() {
    return {
      title: {},
      state: false,
      loveClass: 'icon-20',
      loading: {
        love: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log('Love Component')
    },
    loveUnLove() {
      if (this.state) {
        this.state = false
        this.loveClass = 'love-red'
      } else {
        this.state = true
        this.loveClass = 'icon-40'
      }
    }

  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/love.scss";

</style>