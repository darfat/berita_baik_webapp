<template>
  <div style="background:#f0f2f5;margin-top: -20px;height: 426px">   
    <div class="spacer"> </div>
    <div class="m-t-20">&nbsp; </div>
    <div class="container m-t-20"> 
        <h3 v-if="activationSuccess === true">Terima kasih telah melakukan aktifasi, silakan lakukan login kembali </h3>   
        <h3 v-else>Proses aktifasi gagal</h3>   

    </div>
  </div>
</template>

<script>
import { activate } from '@/api/login'

export default {
  name: 'Activation',
  props: {
    param: { type: String }
  },
  data() {
    return {
      activationSuccess: false,
      code: null,
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
      this.code = this.$route.params.code
      this.doActivation(this.code)
    },
    doActivation(code) {
      activate({
        code
      }).then(response => {
        if (response) {
          console.log(response)
          this.activationSuccess = true
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

</style>