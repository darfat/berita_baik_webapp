<template>
  <div class="articles-container">
    <articles editorialSlug="film" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'filmArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
