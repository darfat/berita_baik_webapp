<template>
  
  <div>
    <article-form editorialSlug="indonesia-bangga"></article-form>
  </div>
</template>

<script>
import ArticleForm from './form'

export default {
  name: 'indonesiaBanggaForm',
  props: {
    editorialSlug: { type: String },
    articleId: { type: String }
  },
  components: { ArticleForm },
  data() {
    return {
    }
  },
  created() {
    console.log('created form id-bangga')
    console.log(this.articleId)
    console.log(this.editorialSlug)
    console.log('end')
  }
}
</script>
