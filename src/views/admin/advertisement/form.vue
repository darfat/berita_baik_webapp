<template>
  <div class="advertisement-form-container">      
        <h2>Iklan Form</h2>
        <el-form class="form-container" ref="advertisementForm" :model="advertisement" :rules="rules" label-width="120px">
            <el-row>
              <el-col :span="21">
                    <el-form-item label="Nama Klien" prop="client_name">
                        <el-input v-model="advertisement.client_name"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="No Order" prop="order_no">
                        <el-input v-model="advertisement.order_no"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="No Banner" prop="banner_no">
                        <el-input v-model="advertisement.banner_no"></el-input>
                    </el-form-item>
                </el-col>
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
                    <el-form-item label="Ukuran" prop="dimension">
                        <el-select v-model="advertisement.type" placeholder="Pilih Ukuran Iklan">
                          <el-option
                            v-for="item in ads_dimension"
                            :key="item.type"
                            :label="item.label "
                            :value="item.type">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Posisi" prop="position">
                        <el-select v-model="advertisement.position" placeholder="Pilih Posisi">
                          <el-option v-if="item.type === advertisement.type"
                            v-for="item in ads_opts"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Gambar" prop="image">
                      <span> {{ main_image_name }}</span>
                        <image-uploader-crop class="image-uploader-btn" :compress="0.8" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" 
                        :width=600
                        :height=66
                        @successCBK="mainImageSuccessCallback"
                        v-if="advertisement.type === '1'">
                        </image-uploader-crop>
                        <image-uploader-crop class="image-uploader-btn" :compress="0.8" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" 
                        :width=600
                        :height=50
                        @successCBK="mainImageSuccessCallback"
                        v-if="advertisement.type === '2'">
                        </image-uploader-crop>
                        <image-uploader-crop class="image-uploader-btn" :compress="0.8" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" 
                        :width=283
                        :height=285
                        @successCBK="mainImageSuccessCallback"
                        v-if="advertisement.type === '3'">
                      </image-uploader-crop>
                      <image-uploader-crop class="image-uploader-btn" :compress="0.8" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" 
                        :width=315
                        :height=402
                        @successCBK="mainImageSuccessCallback"
                        v-if="advertisement.type === '4'">
                      </image-uploader-crop>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="URL" prop="url">
                        <el-input v-model="advertisement.url"></el-input>
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
import ImageUploaderCrop from '@/components/ImageUploaderCrop'
import { mapGetters } from 'vuex'

export default {
  name: 'AdvertisementForm',
  props: {
    advertisementId: { type: String }
  },
  components: {
    ImageUploaderCrop
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
      'email',
      'username',
      'user_id'
    ])
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
          label: 'Home : Atas',
          type: '1'
        },
        {
          value: 'Home : Tengah',
          label: 'Home : Tengah',
          type: '1'
        },
        {
          value: 'Home : Kanan',
          label: 'Home : Kanan',
          type: '3'
        },
        {
          value: 'Home : Galeri',
          label: 'Home : Galeri',
          type: '4'
        },
        {
          value: 'Artikel : Atas',
          label: 'Artikel : Atas',
          type: '1'
        },
        {
          value: 'Artikel : Tengah',
          label: 'Artikel : Tengah',
          type: '2'
        },
        {
          value: 'Artikel : Kanan',
          label: 'Artikel : Kanan',
          type: '3'
        },
        {
          value: 'Kanal : Atas',
          label: 'Kanal : Atas',
          type: '1'
        },
        {
          value: 'Kanal : Kanan',
          label: 'Kanal : Kanan',
          type: '3'
        },
        {
          value: 'Video : Headline',
          label: 'Video : Headline',
          type: '3'
        },
        {
          value: 'Video : Kanan',
          label: 'Video : Kanan',
          type: '3'
        }
      ],
      ads_dimension: [
        {
          type: '1',
          width: 900,
          height: 99,
          label: '900 x 99 (Landscape)'
        },
        {
          type: '2',
          width: 900,
          height: 75,
          label: '900 x 75 (Landscape)'
        },
        {
          type: '3',
          width: 283,
          height: 285,
          label: '283 x 285 (Square)'
        },
        {
          type: '4',
          width: 315,
          height: 400,
          label: '315 x 400 (Home Galeri)'
        }
      ],
      rules: {
        title: [
          { required: true, message: 'Silahkan Isi Nama Iklan', trigger: 'blur' }
        ],
        client_name: [
          { required: true, message: 'Silahkan Isi Nama Klien', trigger: 'blur' }
        ],
        order_no: [
          { required: true, message: 'Silahkan Is No Order', trigger: 'blur' }
        ],
        position: [
          { required: true, message: 'Silahkan Isi Posisi Iklan', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.advertisement.user_id = this.user_id

      if (this.advertisementId && this.advertisementId !== null) {
        this.getById(this.advertisementId)
        this.action = 'edit'
      }
    },
    onChangeType() {
      this.advertisement.position = ''
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            create(this.advertisement)
              .then(response => {
                this.$router.push({ name: 'advertisement-list' })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            update(this.advertisement)
              .then(response => {
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