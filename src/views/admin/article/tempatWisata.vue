<template>
  <div class="articles-container">
    <articles editorialSlug="tempatWisata" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'tempatWisataArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
