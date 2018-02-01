<template>
  <div class="articles-container">
    <articles editorialSlug="indonesia-baik"></articles>
  </div>
</template>

<script>
import Articles from './Articles'

export default {
  name: 'indonesiaBaikArticles',
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
