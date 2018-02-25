<template>
  <section class="home-main">
    <transition name="fade" mode="out-in">
      <router-view :key="$route.fullPath" ></router-view>
    </transition>
  </section>
</template>

<script>
console.log('home main')

export default {
  name: 'HomeMain',
  computed: {
    // key() {
    //   return this.$route.name !== undefined ? this.$route.name + +new Date() : this.$route + +new Date()
    // }
  }
}
</script>
