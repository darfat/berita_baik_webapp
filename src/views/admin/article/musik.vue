<template>
  <div class="articles-container">
    <articles editorialSlug="musik" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'musikArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
