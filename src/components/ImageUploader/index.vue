<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">Browse File
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload :limit="limit" class="editor-slide-upload" action="http://localhost:9528/"  :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="picture-card" accept="image/*" :on-preview="handlePreview" :on-remove="handleRemove" :on-exceed="handleExceed" :on-success="handleSuccess" :on-change="onChange" :before-upload="beforeUpload" :auto-upload="false">
        <el-button size="small" type="primary">Browse File</el-button>
      </el-upload>      
      <el-button @click="dialogVisible = false">Cancel</el-button>
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
      formData: new FormData()
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      upload(this.formData).then(response => {
        if (response) {
          this.$emit('successCBK', response.data)
          this.listObj = {}
          this.fileList = []
          this.formData = new FormData()
          this.dialogVisible = false
        }
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
      console.log('handleRemove')
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      console.log(objKeyArr.length)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          console.log('delete')
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },
    onChange(file) {
      console.log('onChange')
      const isGt2MB = file.size > 2000000
      if (isGt2MB) {
        this.$message.warning('Ukuran file foto tidak boleh lebih dari 2MB')
        this.listObj = {}
        this.fileList = []
        this.formData = new FormData()
        return false
      } else {
        this.formData.append('file', file.raw, file.name)
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning('Melebihi Batas Maksimal Upload Foto')
    },
    handlePreview(file) {
      console.log('handlePreview')
      console.log(file)
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
