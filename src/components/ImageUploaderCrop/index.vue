<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">Browse File
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <div>
        <a class="btn" @click="toggleShow">set avatar</a>
                  <my-upload field="img"
                        @crop-success="cropSuccess"
                        @crop-upload-success="cropUploadSuccess"
                        @crop-upload-fail="cropUploadFail"
                        v-model="show"
                        lang-type="en"
                        :width="300"
                        :height="300"
                        url=""
                        :params="params"
                        :headers="headers"
                        img-format="png"></my-upload>
                  <img :src="imgDataUrl">
      </div>
      <el-button @click="dialogVisible = false">Cancel</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { upload, uploadDataURI } from '@/api/image_upload'
import myUpload from 'vue-image-crop-upload'

export default {
  name: 'imageUploaderCrop',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    isMultiple: {
      type: Boolean,
      default: true
    }
  },
  components: {
    myUpload
  },
  data() {
    return {
      dialogVisible: false,
      show: false,
      params: {
        token: '123456798',
        name: 'avatar'
      },
      headers: {
        smail: '*_~'
      },
      imgDataUrl: ''
    }
  },
  methods: {
    toggleShow() {
      this.show = !this.show
    },
    cropSuccess(imgDataUrl, field) {
      console.log('-------- crop success --------')
      this.imgDataUrl = imgDataUrl
      console.log('do something with this image')
      uploadDataURI({ imgDataUrl }).then(response => {
        if (response) {
          this.$emit('successCBK', response.data)
          this.listObj = {}
          this.fileList = []
          this.formData = new FormData()
          this.dialogVisible = false
        }
      })
    },
    dataURItoBlob(dataURI) {
      var binary = atob(dataURI.split(',')[1])
      var array = []
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i))
      }
      return new Blob([new Uint8Array(array)], {
        type: 'image/jpeg'
      })
    },
    cropUploadSuccess(jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
    },
    cropUploadFail(status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
    }
  }

}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
