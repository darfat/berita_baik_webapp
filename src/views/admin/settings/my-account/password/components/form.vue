<template>
    <div class="password-wrapper">
        <!-- <h1>Change Password</h1> -->
        <!-- <small>Change Password</small> -->
        <el-form class="form-container" ref="passwordVM" :model="passwordVM" :rules="rules"  label-width="200px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Current Password" prop="currentPassword">
                        <el-input :type="currentPasswordType" v-model="passwordVM.currentPassword"></el-input>
                        <!-- <span class="show-pwd" @click="showCurrentPassword"><svg-icon icon-class="eye" /></span> -->
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Password" prop="password">
                        <el-input :type="passwordType" v-model="passwordVM.password"></el-input>
                        <!-- <span class="show-pwd" @click="showPassword"><svg-icon icon-class="eye" /></span> -->
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Confirm Password" prop="confirmPassword">
                        <el-input :type="confirmPasswordType" v-model="passwordVM.confirmPassword"></el-input>
                        <!-- <span class="show-pwd" @click="showConfirmPassword"><svg-icon icon-class="eye" /></span> -->
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
import { validatePassword, changePassword } from '@/api/profile'
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
        if (value && value.length < 8) {
          callback(new Error('Password kurang dari 8 digit'))
        }
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
      passwordType: 'password',
      confirmPasswordType: 'password',
      currentPasswordType: 'password',
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
          let user = {}
          user = this.passwordVM
          user.id = this.user_id
          changePassword(user)
            .then(response => {
              this.$message({
                type: 'success',
                message: 'Password Berhasil Di Ubah'
              })
              this.$router.push({ path: '/cms' })
            })
            .catch(error => {
              console.log(error)
              this.$message.warning('Terjadi kesalahan')
            })
        } else {
          console.error('error submit!!')
          return false
        }
        this.loading = false
      })
    },
    showPassword() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
    },
    showConfirmPassword() {
      if (this.confirmPasswordType === 'password') {
        this.confirmPasswordType = ''
      } else {
        this.confirmPasswordType = 'password'
      }
    },
    showCurrentPassword() {
      if (this.currentPasswordType === 'password') {
        this.currentPasswordType = ''
      } else {
        this.currentPasswordType = 'password'
      }
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