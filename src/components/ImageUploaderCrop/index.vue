<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">Browse File
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <div class="editor-slide-upload">        
        <my-image-cropper :file-size-limit="sizeLimit"
          :width="640"
          :height="360"
          accept=".jpg,.jpeg,.png" 
          v-model="imageCropper"
          :canvas-color="'gray'"
          @file-choose="handleCroppaFileChoose"
          @file-size-exceed="handleCroppaFileSizeExceed"
          @file-type-mismatch="handleCroppaFileTypeMismatch"
          @image-remove="handleImageRemove"
          :prevent-white-space="true"
          :remove-button-size="20"
          ></my-image-cropper>
      </div>
      <div>
      <el-button @click="dialogVisible = false">Cancel</el-button>
      <el-button type="primary" @click="uploadCroppedImage">Upload</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { upload } from '@/api/image_upload'

export default {
  name: 'imageUploaderCrop',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    compress: {
      type: Number
    },
    sizeLimit: {
      type: Number
    },
    sizeLimitMessage: {
      type: String
    },
    index: {
      type: Number
    }
  },
  components: {},
  data() {
    return {
      dialogVisible: false,
      imageCropper: {},
      filename: null,
      filetype: null
    }
  },
  methods: {
    handleCroppaFileChoose(file) {
      // console.log('handleCroppaFileChoose')
      const d = new Date()
      const time = d.getTime()
      this.filetype = file.type
      this.filename = time + '-' + file.name
    },
    handleCroppaFileSizeExceed(file) {
      // console.log('handleCroppaFileSizeExceed')
      this.$message.warning('Terjadi Kesalahan \n Foto Yang Diupload Melebihi maksimal size, Batas Maksimal untuk upload foto adalah ' + this.sizeLimitMessage)
    },
    handleCroppaFileTypeMismatch(file) {
      // console.log('handleCroppaFileTypeMismatch')
      this.$message.warning('Terjadi Kesalahan \n Foto Yang Diupload hanya format jpg/png\n')
    },
    handleImageRemove() {
      // console.log('handleImageRemove')
    },
    uploadCroppedImage() {
      // console.log('upload cropped image')
      this.imageCropper.generateBlob(
        blob => {
          // write code to upload the cropped image file (a file is a blob)
          var formData = new FormData()
          formData.append('file', blob, this.filename)
          upload(formData).then(response => {
            if (response) {
              var data = response.data
              if (data && data.length > 0) {
                data[0].index = this.index
              }
              this.$emit('successCBK', data)
              this.dialogVisible = false
            }
          }).catch(error => {
            console.log(error)
            this.$message.warning('Terjadi Kesalahan \n' + error)
          })
        },
        this.filetype,
        this.compress
      ) // 90% default jpeg file
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
    max-width: 800px;
  }
}
</style>
