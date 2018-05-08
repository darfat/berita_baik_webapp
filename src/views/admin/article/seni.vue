<template>
  <div class="articles-container">
    <articles editorialSlug="seni" articleType="news"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'seniArticles',
  components: { Articles },
  data() {
    return {
    }
  },
  created() {}
}
</script>
