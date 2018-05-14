<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">Browse File
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload :limit="limit" class="editor-slide-upload" action="http://localhost:9528/"  :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="picture-card" accept="image/*" :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleExceed" :on-success="handleSuccess" :on-change="onChange" :before-upload="beforeUpload" :auto-upload="false">
        <el-button size="small" type="primary">Browse File</el-button>
      </el-upload>      
      <el-button @click="handleCancel">Cancel</el-button>
      <el-button type="primary" @click="handleSubmit">Upload</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { upload } from '@/api/image_upload'

export default {
  name: 'imageUploader',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    },
    limit: {
      type: Number,
      default: 1
    },
    isMultiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [],
      formData: new FormData(),
      uploadedFiles: []
    }
  },
  created() {
    this.listObj = {}
    this.fileList = []
    this.formData = new FormData()
    this.uploadedFiles = []
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      console.log(this.uploadedFiles.length)
      this.formData = new FormData()
      for (let i = 0, len = this.uploadedFiles.length; i < len; i++) {
        const file = this.uploadedFiles[i]
        const d = new Date()
        const time = d.getTime()
        const filename = time + '-' + file.name
        this.formData.append('file', file.raw, filename)
      }
      upload(this.formData).then(response => {
        if (response) {
          this.$emit('successCBK', response.data)
          this.listObj = {}
          this.fileList = []
          this.uploadedFiles = []
          this.formData = null
          this.dialogVisible = false
        }
      }).catch(error => {
        console.log(error)
        this.$message.warning('Terjadi Kesalahan \n' + error)
      })
    },
    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          this.listObj[objKeyArr[i]].url = response.files.file
          this.listObj[objKeyArr[i]].hasSuccess = true
          return
        }
      }
    },
    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
      for (let i = 0, len = this.uploadedFiles.length; i < len; i++) {
        if (this.uploadedFiles[i].uid === uid) {
          this.uploadedFiles.splice(i)
          return
        }
      }
    },
    onChange(file) {
      const isGt2MB = file.size > 4000000
      if (isGt2MB) {
        this.$message.warning('Ukuran file foto tidak boleh lebih dari 4MB')
        this.listObj = {}
        this.fileList = []
        this.formData = new FormData()
        return false
      } else {
        this.uploadedFiles.push(file)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning('Melebihi Batas Maksimal Upload Foto')
    },
    handlePreview(file) {
    },
    handleCancel() {
      console.log('handleCancel')
      console.log(this.uploadedFiles.length)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
      this.uploadedFiles = []
    },
    beforeUpload(file) {
      const _self = this
      const _URL = window.URL || window.webkitURL
      const fileName = file.uid
      this.listObj[fileName] = {}
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = _URL.createObjectURL(file)
        img.onload = function() {
          _self.listObj[fileName] = {
            hasSuccess: false,
            uid: file.uid,
            width: this.width,
            height: this.height
          }
        }
        resolve(true)
      })
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
