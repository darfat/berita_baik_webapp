<template>
  <div class="articles-container">
    <articles :editorialSlug="editorialSlug" :articleType="articleType"></articles>
  </div>
</template>

<script>
import Articles from './articles'

export default {
  name: 'moderasiBeritaKamu',
  components: { Articles },
  data() {
    return {
      editorialSlug: 'berita-kamu',
      articleType: 'y-news'
    }
  },
  created() {}
}
</script>
