<template>
  <div style="background:#f0f2f5;margin-top: -20px;height: 426px">   
    <div class="spacer"> </div>
    <div class="m-t-20">&nbsp; </div>
    <div class="container m-t-20" v-if="showMessage"> 
        <h3>Password baru sudah dikirim melalui email, Terima Kasih </h3>   
    </div>
  </div>
</template>

<script>

export default {
  name: 'PasswordResetSuccess',
  props: {
    showMessage: { type: Boolean, default: false }
  },
  data() {
    return {
      title: {},
      loading: {
        success: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>