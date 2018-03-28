<template>
  <div class="upload-container">
    <el-button icon='el-icon-upload' size="mini" :style="{background:color,borderColor:color}" @click=" dialogVisible=true" type="primary">Upload
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload class="editor-slide-upload" action="http://localhost:9528/"  :multiple="true" :file-list="fileList" :show-file-list="true"
        list-type="picture-card" :on-remove="handleRemove" :on-success="handleSuccess" :on-change="onChange" :before-upload="beforeUpload" :auto-upload="false">
        <el-button size="small" type="primary">Upload</el-button>
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
      // console.log(this.formData)
      const fileItem = this.fileList[0]
      upload({ fileItem }).then(response => {
        if (response) {
          console.log(response)
        }
      })
      this.$emit('successCBK', this.formData)
      this.listObj = {}
      this.fileList = []
      this.dialogVisible = false
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
    },
    onChange(file, fileList) {
      console.log('invoke onChange upload')
      console.log(file)
      console.log(fileList.length)
      this.fileList = fileList

      // append the files to FormData
      // Array
      //   .from(Array(fileList.length).keys())
      //   .map(x => {
      //     this.formData.append("imageAttachment", fileList[x], fileList[x].name)
      //   })
      this.formData.append('file', file)
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
