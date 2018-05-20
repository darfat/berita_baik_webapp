<template>
  <div style="background:#f0f2f5;margin-top: -20px;height: 426px">   
    <div class="spacer"> </div>
    <div class="m-t-20">&nbsp; </div>
    <div class="container m-t-20"> 
        <h3>Terima Kasih Telah Melakukan Registrasi, Silakan Cek Email Untuk Proses Verifikasi </h3>   
    </div>
  </div>
</template>

<script>

export default {
  name: 'SignupSuccess',
  props: {
    param: { type: String }
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
      console.log('init')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
 @import "src/styles/portal-signup-success.scss";

</style>