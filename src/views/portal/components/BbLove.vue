<template>
<span>
  <a class="love" v-on:click="loveUnLove" v-if="scale === 1" >      
       <v-icon name="heart" base-class="icon-20 love-me" v-show="state === true"  ></v-icon> 
       <v-icon name="heart" base-class="icon-20 hate-me" v-show="state === false" ></v-icon> 
  </a>
  <a class="love" v-on:click="loveUnLove" v-else >      
       <v-icon name="heart" base-class="icon-30 love-me" v-show="state === true"  ></v-icon> 
       <v-icon name="heart" base-class="icon-30 hate-me" v-show="state === false" ></v-icon> 
  </a>
</span>
</template>

<script>
// import { getArticle } from '@/api/article'
import { mapGetters } from 'vuex'

export default {
  name: 'BbLove',
  props: {
    articleID: { type: String, default: '000' },
    type: { type: String, default: 'article' },
    scale: { type: Number, default: 1 }
  },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
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

    },
    loveUnLove() {
      if (this.name) { // login name
        if (this.state) {
          this.state = false
          this.loveClass = 'love-red'
        } else {
          this.state = true
          this.loveClass = 'icon-20'
        }
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