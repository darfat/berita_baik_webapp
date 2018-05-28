<template>
  <div class="event-form-container">      
        <h2>Event Form</h2>
        <el-form class="form-container" ref="eventForm" :model="event" label-width="120px">
            <el-row>
                <el-col :span="21">
                    <el-form-item label="Nama Event" prop="title">
                        <el-input v-model="event.title"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                  <el-form-item label="Tanggal">
                    <el-row :gutter="20">
                      <el-col :span="6">
                        <el-date-picker type="datetime" placeholder="Awal" v-model="event.date" style="width: 100%;"></el-date-picker>
                      </el-col>
                      <el-col :span="6">
                        <el-date-picker type="datetime" placeholder="Akhir" v-model="event.end_date" style="width: 100%;"></el-date-picker>
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
                    <el-form-item label="Lokasi" prop="place">
                        <el-input v-model="event.place"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Alamat" prop="address">
                        <el-input  type="textarea" :autosize="{ minRows: 2 }" v-model="event.address"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Deskripsi" prop="description">
                        <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="event.description"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="URL Tiket" prop="ticketing_url">
                        <el-input v-model="event.ticketing_url"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Premium" prop="is_premium">
                      <el-switch v-model="event.is_premium" active-text="Premium" inactive-text="Standar" ></el-switch>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item>
                        <el-button @click="back()" >Cancel</el-button>
                        <el-button type="primary" @click="onSubmit('eventForm')" >Save</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
  </div>
</template>

<script>
import { update, create, getEventById } from '@/api/event'
import ImageUploader from '@/components/ImageUploader'

export default {
  name: 'EventForm',
  props: {
    eventId: { type: String }
  },
  components: {
    ImageUploader
  },
  data() {
    return {
      event: {
        status: 'new'
      },
      action: 'add',
      loading: {
        snippet: false
      },
      main_image_name: ''
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (this.eventId && this.eventId !== null) {
        this.getById(this.eventId)
        this.action = 'edit'
      }
    },
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.action === 'add') {
            create(this.event)
              .then(response => {
                this.$router.push({ name: 'event-list' })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            update(this.event)
              .then(response => {
                this.$router.push({ name: 'event-list' })
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
    getById(eventID) {
      getEventById({
        eventID
      }).then(response => {
        if (response) {
          this.event = response.data
          if (this.event.image) {
            const aarName = this.event.image.split('/')
            this.main_image_name = aarName[aarName.length - 1]
          }
        }
      })
    },
    mainImageSuccessCallback(res) {
      if (res) {
        this.event.image = res[res.length - 1].url
        this.main_image_name = res[res.length - 1].filename
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
      }
    },
    back() {
      this.$router.push({ name: 'event-list' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.image-uploader-btn {
  display: inline-block;
  }

</style>