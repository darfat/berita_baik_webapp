<template>
  <div class="separator">
    <span> &nbsp; </span>
  </div>
</template>

<script>
export default {
  name: 'article-separator',
  props: {},
  computed: {},
  created() {
    console.log('separator')
  }
}
</script>

<style scoped>
.separator {
  background-color: #fbdd01;
  width:60%; 
  display:inline-table;
  min-height: 3%;
}
</style>
