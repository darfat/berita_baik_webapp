<template>
  <div class="articles-container">
    <my-articles :editorialSlug="editorialSlug" :articleType="articleType"></my-articles>
  </div>
</template>

<script>
import MyArticles from './myArticles'

export default {
  name: 'indonesiaBaikArticles',
  components: { MyArticles },
  data() {
    return {
      editorialSlug: 'berita-kamu',
      articleType: 'y-news'
    }
  },
  created() {}
}
</script>
