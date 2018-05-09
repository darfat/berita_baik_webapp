<template>
  <div class="articles-container">
    <articles editorialSlug="video" articleType="video"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'videoArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
