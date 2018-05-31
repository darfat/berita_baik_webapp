<template>
    <div class="profile-wrapper">
        <h1>Edit Profile</h1>
        <small>Edit Profile</small>
        <el-form class="form-container" ref="profileForm" :model="profile" label-width="120px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Email" prop="email">
                        <el-input v-model="profile.email" disabled></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Full Name" prop="name">
                        <el-input v-model="profile.name"></el-input>
                    </el-form-item>
                </el-col>                
                <el-col :span="21">
                    <el-form-item label="Bio" prop="bio">
                        <el-input v-model="profile.bio"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="Introduction" prop="Introduction">
                        <el-input v-model="profile.introduction"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Inisial" prop="Inisial">
                        <el-input v-model="profile.initial"></el-input>
                    </el-form-item>
                </el-col>                
                <el-col :span="21" >
                    <el-form-item label="Instagram" prop="Instagram">
                        <el-input v-model="profile.instagram_username"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="NIK" prop="NIK">
                        <el-input v-model="profile.nik"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="Rekening" prop="Rekening">
                        <el-input v-model="profile.rekening"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21" hidden>
                    <el-form-item label="Bank" prop="Bank">
                        <el-input v-model="profile.bank"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Foto" prop="foto">
                        <image-uploader-crop class="image-uploader-btn" :width=160 :height=160 :compress="0.9" :sizeLimit="2000000" :sizeLimitMessage="'2MB'" @successCBK="mainImageSuccessCallback"></image-uploader-crop>
                    </el-form-item>
                </el-col>

                <el-col :span="21">
                    <el-form-item>
                        <el-button @click="reset">Cancel</el-button>
                        <el-button type="primary" @click="onSubmit('profileForm')" >Update</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
    </div>
</template>
<script>
import { update, getProfileById } from '@/api/profile'
import { mapGetters } from 'vuex'
import ImageUploaderCrop from '@/components/ImageUploaderCrop'

export default {
  name: 'profileDetail',
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
  components: {
    ImageUploaderCrop
  },
  data() {
    return {
      profile: {
        name: '',
        email: ''
      },
      main_image_name: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.user_id && this.user_id !== null) {
        this.getById(this.user_id)
        this.action = 'edit'
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.action === 'edit') {
            update(this.profile)
              .then(response => {
                this.$message({
                  type: 'success',
                  message: 'Data Berhasil Di Ubah'
                })
              })
              .catch(error => {
                console.log(error)
                this.$message.warning('Terjadi kesalahan pada pengisian form')
              })
          }
        } else {
          console.error('failed to submit!!')
          return false
        }
      })
    },
    getById(userID) {
      getProfileById({
        userID
      }).then(response => {
        if (response) {
          this.profile = response.data
        }
      })
    },
    reset() {
      this.getById(this.user_id)
      this.action = 'edit'
    },
    mainImageSuccessCallback(res) {
      if (res) {
        this.profile.image = res[res.length - 1].url
        this.main_image_name = res[res.length - 1].filename
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "src/styles/mixin.scss";
.profile-wrapper{
    padding: 0 20px;
}
h1{
    margin: 0;
}
</style>