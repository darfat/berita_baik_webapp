<template>
  <div class="advertisement-form-container">      
        <h2>Iklan Form</h2>
        <el-form class="form-container" ref="advertisementForm" :model="advertisement" label-width="120px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Nama Iklan" prop="title">
                        <el-input v-model="advertisement.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                  <el-form-item label="Tanggal">
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <el-date-picker type="datetime" placeholder="Awal" v-model="advertisement.start_date" style="width: 100%;"></el-date-picker>
                      </el-col>
                      <el-col :span="6">
                        <el-date-picker type="datetime" placeholder="Akhir" v-model="advertisement.end_date" style="width: 100%;"></el-date-picker>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Gambar" prop="image">
                      <span> {{ main_image_name }}</span>
                      <image-uploader :isMultiple="false" :limit=1 class="image-uploader-btn" @successCBK="mainImageSuccessCallback"></image-uploader>
                      <div slot="tip" class="el-upload__tip">Jumlah Maksimal Upload 5 Foto, Maks 2MB Per Foto dan Nama File Gambar Utama Tidak Boleh Ada Spasi</div>

                    </el-form-item>
                </el-col>

                <el-col :span="21">
                    <el-form-item label="Posisi" prop="position">
                        <el-select v-model="advertisement.position" placeholder="Pilih Posisi">
                          <el-option
                            v-for="item in ads_opts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Deskripsi" prop="description">
                        <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="advertisement.description"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <el-button @click="back()" >Cancel</el-button>
                        <el-button type="primary" @click="onSubmit('advertisementForm')" >Save</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
  </div>
</template>

<script>
import { update, create, getAdvertisementById } from '@/api/advertisement'
import ImageUploader from '@/components/ImageUploader'

export default {
  name: 'AdvertisementForm',
  props: {
    advertisementId: { type: String }
  },
  components: {
    ImageUploader
  },
  data() {
    return {
      advertisement: {
        status: 'new',
        active: true
      },
      action: 'add',
      loading: {
        snippet: false
      },
      main_image_name: '',
      ads_opts: [
        {
          value: 'Home : Atas',
          label: 'Home : Atas'
        },
        {
          value: 'Home : Tengah',
          label: 'Home : Tengah'
        },
        {
          value: 'Home : Kanan',
          label: 'Home : Kanan'
        },
        {
          value: 'Home : Galeri',
          label: 'Home : Galeri'
        },
        {
          value: 'Berita : Atas',
          label: 'Berita : Atas'
        },
        {
          value: 'Berita : Tengah',
          label: 'Berita : Tengah'
        }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.advertisementId)
      if (this.advertisementId && this.advertisementId !== null) {
        this.getById(this.advertisementId)
        this.action = 'edit'
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            create(this.advertisement)
              .then(response => {
                console.log('create success')
                this.$router.push({ name: 'advertisement-list' })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            update(this.advertisement)
              .then(response => {
                console.log('update success')
                this.$router.push({ name: 'advertisement-list' })
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
    getById(advertisementID) {
      getAdvertisementById({
        advertisementID
      }).then(response => {
        if (response) {
          this.advertisement = response.data
          if (this.advertisement.image) {
            const aarName = this.advertisement.image.split('/')
            this.main_image_name = aarName[aarName.length - 1]
          }
        }
      })
    },
    mainImageSuccessCallback(res) {
      if (res) {
        this.advertisement.image = res[res.length - 1].url
        this.main_image_name = res[res.length - 1].filename
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
      }
    },
    back() {
      this.$router.push({ name: 'advertisement-list' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image-uploader-btn {
  display: inline-block;
  }

</style>