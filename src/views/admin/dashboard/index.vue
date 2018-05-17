<template>
  <div class="dashboard-container">
    <h1> Dashboard Page </h1>
    <div class="dashboard-text">Hi {{name}} </div>
    <!-- <div class="dashboard-text">Role :  {{roles}}</div> -->
    <div class="dashboard-text">roles:<span v-for='a in roles' :key='a'>{{a}}</span></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'dashboard',
  computed: {
    ...mapGetters([
      'name',
      'role',
      'roles',
      'email',
      'user_id'
    ])
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
