<template>
  <div class="subscribe">      
    <el-form class="form-container" ref="subscribeForm" :model="userSubscribe" :rules="rules">
      <el-row :gutter="20" class="subscribe-content">
          <el-col :span="8"  >
              <span>  <v-icon name="mail" base-class="icon-1dot8em v-align-middle"></v-icon>  </span>
              <span>SELALU UPDATE</span>
              <span class="font-blue"> BERITA BAIK</span>
              
          </el-col>
          <el-col :span="5"  >
              <el-form-item prop="name">
                  <el-input placeholder="Nama Anda" required v-model="userSubscribe.name" ></el-input> 
              </el-form-item>
          </el-col>
          <el-col :span="5"  >
              <el-form-item prop="email"> <el-input type="email"  required placeholder="Surel Anda" v-model="userSubscribe.email" prop="email" ></el-input>
              </el-form-item>
          </el-col>
           <el-col :span="2"  >
              <el-button  @click="onSubmit('subscribeForm')" >Subscribe</el-button>
           </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import { create } from '@/api/subscribe'

export default {
  name: 'Subscribe',
  data() {
    return {
      userSubscribe: {
        name: null,
        email: null
      },
      errorName: null,
      rules: {
        name: [
          { required: true, message: 'Silahkan Isi nama', trigger: 'blur' }
        ],
        email: [
          { required: true, message: 'Silahkan Isi email', trigger: 'blur' }
        //  { validator: this.validEmail(), trigger: 'blur' }
        ]
      }
    }
  },
  created() {
  },
  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          create(this.userSubscribe)
            .then(response => {
              console.log('create success')
              this.$message({
                type: 'success',
                message: 'Terima kasih, data berhasil kami simpan'
              })
              this.userSubscribe = {
                name: null,
                email: null
              }
            })
            .catch(error => {
              console.log(error)
            })
        } else {
          console.error('failed to submit!!')
          return false
        }
      })
    },
    validEmail() {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return re.test(this.userSubscribe.email)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/subscribe.scss";

</style>
