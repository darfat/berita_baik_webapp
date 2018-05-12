<template>
  <div class="dashboard-container">
  </div>
</template>

<script>
export default {
  name: 'Logout',
  created() {
    this.doLogout()
  },
  methods: {
    doLogout() {
      console.log('doLogout')
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
