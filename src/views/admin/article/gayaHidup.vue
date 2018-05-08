<template>
  <div class="articles-container">
    <articles editorialSlug="gaya-hidup" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'gayaHidupArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
