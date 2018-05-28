<template>
  <div class="articles-container">
    <my-articles :editorialSlug="editorialSlug" :articleType="articleType"></my-articles>
  </div>
</template>

<script>
import MyArticles from './myArticles'

export default {
  name: 'citraArticles',
  components: { MyArticles },
  data() {
    return {
      editorialSlug: 'foto-kamu',
      articleType: 'y-image'
    }
  },
  created() {}
}
</script>
