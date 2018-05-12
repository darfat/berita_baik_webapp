<template>
    <div class="password-wrapper">
        <h1>Change Password</h1>
        <!-- <small>Change Password</small> -->
        <el-form class="form-container" ref="passwordVM" :model="passwordVM" :rules="rules"  label-width="200px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Current Password" prop="currentPassword">
                        <el-input type="password" v-model="passwordVM.currentPassword"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Password" prop="password">
                        <el-input type="password" v-model="passwordVM.password"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Confirm Password" prop="confirmPassword">
                        <el-input type="password" v-model="passwordVM.confirmPassword"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <el-button>Cancel</el-button>
                        <el-button type="primary" :loading="loading" @click.native.prevent="handleChangePassword" >Change</el-button>                        
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { validatePassword } from '@/api/profile'
import { mapGetters } from 'vuex'

export default {
  name: 'formPassword',
  props: {
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters([
      'role',
      'user_id'
    ])
  },
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Silakan Isi Password'))
      } else {
        if (this.passwordVM.confirmPassword !== '') {
          this.$refs.passwordVM.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Silakan Ulangi Password anda'))
      } else if (value !== this.passwordVM.password) {
        callback(new Error('Password tidak sama'))
      } else {
        callback()
      }
    }
    const validateCurrentPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Silakan Input Password Lama'))
      } else {
        validatePassword(this.user_id, value).then(response => {
          if (response && response.data && response.data.status === 'ok') {
            callback()
          }
        })
          .catch(error => {
            console.error(error)
            callback(new Error('Password Lama Anda Tidak Sesuai'))
          })
      }
    }
    return {
      passwordVM: {},
      rules: {
        currentPassword: [
          { trigger: 'blur', validator: validateCurrentPassword }
        ],
        password: [
          { trigger: 'blur', validator: validatePass }
        ],
        confirmPassword: [
          { trigger: 'blur', validator: validatePass2 }
        ]
      },
      loading: false
    }
  },
  methods: {
    handleChangePassword() {
      this.$refs.passwordVM.validate(valid => {
        if (valid) {
          this.loading = true
        } else {
          console.error('error submit!!')
          return false
        }
        this.loading = false
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.password-wrapper{
    padding: 0 20px;    
}
h1{
    margin: 0;
}
</style>