<template>
  <div class="articles-container">
    <articles editorialSlug="komunitas" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'komunitasArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
