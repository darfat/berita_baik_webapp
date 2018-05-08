<template>
  <div class="articles-container">
    <articles editorialSlug="kuliner" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'kulinerArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
