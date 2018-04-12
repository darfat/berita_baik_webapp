<template>
  <div class="articles-container">
    <articles editorialSlug="gallery-foto" articleType="image"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'citraArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
