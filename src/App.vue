<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Good news, is the best news!',
    // all titles will be injected into this template
    titleTemplate: '%s | Beritbaik.id'
  }
}
</script>
