<template>
  <div class="articles-container">
    <articles editorialSlug="sosok-inspiratif" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'sosokInspiratifArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
