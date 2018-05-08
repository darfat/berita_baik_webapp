<template>
  <div class="articles-container">
    <articles editorialSlug="teknologi" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'teknologiArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
