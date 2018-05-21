<template>
  <div class="user-form-container">      
        <h2>User Form</h2>
        <el-form class="form-container" ref="userForm" :model="user" label-width="120px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="user.email" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Full Name" prop="name">
                        <el-input v-model="user.name"></el-input>
                    </el-form-item>
                </el-col>              
                <el-col :span="21">
                    <el-form-item label="Role" prop="role">
                        <el-select v-model="user.role" placeholder="Pilih Role">
                          <el-option
                            v-for="item in role_opts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>  
                <el-col :span="21">
                    <el-form-item label="Bio" prop="bio">
                        <el-input v-model="user.bio"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="Introduction" prop="Introduction">
                        <el-input v-model="user.introduction"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Inisial" prop="Inisial">
                        <el-input v-model="user.initial"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="NIK" prop="NIK">
                        <el-input v-model="user.nik"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="Rekening" prop="Rekening">
                        <el-input v-model="user.rekening"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="Bank" prop="Bank">
                        <el-input v-model="user.bank"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Status" prop="status">
                        <el-select v-model="user.status" placeholder="Pilih Status">
                          <el-option
                            v-for="item in status_opts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col> 
                <el-col :span="21">
                    <el-form-item>
                        <el-button @click="back()" >Cancel</el-button>
                        <el-button type="primary" @click="onSubmit('userForm')" >Save</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
  </div>
</template>

<script>
import { update, create, getUserById } from '@/api/user'
import ImageUploader from '@/components/ImageUploader'

export default {
  name: 'UserForm',
  props: {
    userID: { type: String }
  },
  components: {
    ImageUploader
  },
  data() {
    return {
      user: {
        status: 'new'
      },
      action: 'add',
      loading: {
        snippet: false
      },
      role_opts: [
        {
          value: 'editor',
          label: 'Editor'
        },
        {
          value: 'reporter',
          label: 'Reporter'
        },
        {
          value: 'public',
          label: 'Public'
        },
        {
          value: 'marketing',
          label: 'Marketing'
        }
      ],
      status_opts: [
        {
          value: 'active',
          label: 'Active'
        },
        {
          value: 'inactive',
          label: 'Inactive'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.userID && this.userID !== null) {
        this.getById(this.userID)
        this.action = 'edit'
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            create(this.user)
              .then(response => {
                console.log('create success')
                this.$router.push({ name: 'user-list' })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            update(this.user)
              .then(response => {
                console.log('update success')
                this.$router.push({ name: 'user-list' })
              })
              .catch(error => {
                console.log(error)
              })
          }
        } else {
          console.error('failed to submit!!')
          return false
        }
      })
    },
    getById(userID) {
      getUserById({
        userID
      }).then(response => {
        if (response) {
          this.user = response.data
        }
      })
    },
    mainImageSuccessCallback(res) {
      if (res) {
        this.user.image = res[res.length - 1].url
        this.main_image_name = res[res.length - 1].filename
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
      }
    },
    back() {
      this.$router.push({ name: 'user-list' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image-uploader-btn {
  display: inline-block;
  }

</style>