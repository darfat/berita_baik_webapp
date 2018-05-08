<template>
  <div class="articles-container">
    <articles editorialSlug="fashion" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'fashionArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
