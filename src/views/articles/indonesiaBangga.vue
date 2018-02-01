<template>
  <div class="articles-container">
    <articles editorialSlug="indonesia-bangga"></articles>
  </div>
</template>

<script>
import Articles from './Articles'

export default {
  name: 'indonesiaBanggaArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {
    console.log('created')
  }
}
</script>
