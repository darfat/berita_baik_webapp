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
                        <el-date-picker type="datetime" placeholder="Awal" v-model="event.event_date" style="width: 100%;"></el-date-picker>
                      </el-col>
                      <el-col :span="6">
                        <el-date-picker type="datetime" placeholder="Akhir" v-model="event.event_end_date" style="width: 100%;"></el-date-picker>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Lokasi" prop="place">
                        <el-input v-model="event.place"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="21">
                    <el-form-item label="Deskripsi" prop="description">
                        <el-input type="textarea" :autosize="{ minRows: 4 }" v-model="event.description"></el-input>
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

export default {
  name: 'EventForm',
  props: {
    eventId: { type: String }
  },
  data() {
    return {
      event: {
        status: 'new',
        active: true
      },
      action: 'add',
      loading: {
        snippet: false
      }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.eventId)
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
                console.log('create success')
                this.$router.push({ name: 'event-list' })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            update(this.event)
              .then(response => {
                console.log('update success')
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
        }
      })
    },
    back() {
      this.$router.push({ name: 'event-list' })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
//  @import "src/styles/snippet.scss";

</style>