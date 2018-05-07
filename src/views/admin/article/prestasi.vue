<template>
  <div class="articles-container">
    <articles editorialSlug="prestasi" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'prestasiArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
