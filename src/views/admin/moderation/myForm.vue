<template>
    <div class="createPost-container">
        <div> 
          <!-- <el-alert
            title="success alert"
            type="success"
            description=""
            show-icon>
          </el-alert>   -->
          <h2>Form {{editorialSlug}}</h2>
        </div>
        
        <el-form  class="form-container"  ref="articleForm" :model="article" :rules="rules" label-width="150px">
            <el-form-item label="Type" hidden="true">
                <el-radio-group v-model="article.article_type">
                <el-radio v-for="item in article_type_opts"
                    :key="item.value"
                    :label="item.value"
                > {{ item.label }} </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Section" hidden="true">
                <el-select v-model="article.section" placeholder="Pilih section">
                <el-option
                    v-for="item in section_opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Judul" prop="title">
                <el-input v-model="article.title"  v-on:change="generateSlug" :maxlength="100" ></el-input>
            </el-form-item>            
            <el-form-item label="Ringkasan Utama" prop="teaser" v-if="article.article_type === 'y-news'" >
              <div class="editor-container">
                 <el-input type="textarea" :rows="4" v-model="article.teaser" :maxlength="500" ></el-input>
                 <!-- <tinymce :height="100" v-model="article.teaser" ref="editor"  id='teaser' ></tinymce> -->
              </div>
            </el-form-item>
            <el-form-item label="Isi" prop="content" v-if="article.article_type !== 'video' && editorialSlug !== 'infografis'">
              <div>
              <tinymce :height="400" v-model="article.content" ref="editor"  id='content'   ></tinymce>
              <!-- <div slot="tip" class="el-upload__tip"> Tag &lt;related/&gt; : untuk menambahkan Berita Terkait di dalam konten </div> -->
              </div>
            </el-form-item>
            <el-form-item label="Tags">
                    <el-tag
                    :key="tag"
                    v-for="tag in tagArray"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseTag(tag)">
                    {{tag}}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="inputVisible"
                    v-model="inputValue"
                    ref="saveTagInput"
                    size="mini"
                    @keyup.enter.native="handleInputTagConfirm"
                    @blur="handleInputTagConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInputTag">+ New Tag</el-button>
            </el-form-item>
            <el-form-item label="Gambar Utama"  prop="main_image" v-if="article.article_type === 'y-news' || editorialSlug === 'infografis'" >
              <div>
                <span> {{ main_image_name }}</span>
                <image-uploader v-if="editorialSlug === 'infografis'" :isMultiple="false" class="image-uploader-btn" @successCBK="mainImageSuccessCallback"></image-uploader>
                <image-uploader-crop v-else class="image-uploader-btn" :compress="0.9" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" @successCBK="mainImageSuccessCallback"></image-uploader-crop>
                <el-popover
                  placement="right"
                  width="400"
                  trigger="click">
                  <div>
                    <img :src="article.main_image" width="100%" height="100%"/>
                  </div>
                  <el-button slot="reference" size="mini">Lihat Gambar</el-button>
                </el-popover>
              </div>
              <div>
              <div slot="tip" class="el-upload__tip">Maks 4MB dan Nama File Gambar Utama Tidak Boleh Ada Spasi</div>
              </div>
            </el-form-item>
            
            <el-form-item label="Gallery" v-if="article.article_type === 'y-image' && editorialSlug === 'foto-kamu'">
              <!-- <div class="gray-horizontal"></div> -->
              <div>
                <div> <small> Main Image : <span> {{ main_image_name }}</span> </small></div>
                <div v-if="article.article_images && article.article_images.length > 0">
                  {{tempCount}} / {{article.article_images.length}} Foto Berhasil Diupload
                </div>
                <!-- <image-uploader :isMultiple="true" :limit=5 class="image-uploader-btn" @successCBK="gallerySuccessCallback"></image-uploader> -->
                <div v-for="(item, index) in article.article_images" :key="index">
                  <span>{{item.title}}</span>
                  <image-uploader-crop  class="image-uploader-btn" :compress="0.9" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" :index="index" @successCBK="gallerySuccessCallback"></image-uploader-crop>
                  <el-button icon='el-icon-remove' size="mini" type="danger" v-on:click="removeImages(index)">  </el-button>
                    <el-popover
                    placement="right"
                    width="400"
                    trigger="click">
                    <div>
                      <img :src="item.url" width="100%" height="100%"/>
                    </div>
                    <el-button slot="reference" size="mini">Lihat Gambar</el-button>
                  </el-popover>
                </div>
                <div slot="tip" class="el-upload__tip" ref="divTipImages">Maks 4MB Per Foto dan Nama File Gambar Utama Tidak Boleh Ada Spasi</div>
                <div class="gray-horizontal"></div>
                <div class="m-t-10">
                    <el-button class="primary" v-on:click="addImages">Tambah Gambar</el-button>
                </div>
                
              </div>
            </el-form-item>
            
            <el-row :gutter="20" v-if="article.article_type === 'y-news'" hidden="true" >
              <el-col :span="6" style="padding-left:63px">
                <div>
                  <span><strong> News </strong> </span>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="Related News" v-if="article.article_type === 'y-news'" hidden="true">
                <div>
                  <el-table
                    :data="article.article_relates"
                    style="width: 98%">
                    <el-table-column
                      label="Article"
                      prop="article_id"
                      >
                      <template slot-scope="scope">
                        <div>
                          <el-select 
                            v-model="scope.row.article_id"
                            filterable
                            placeholder="Cari berdasar judul"
                            :loading="loading.article_relates_filter"
                            style="width: 100%">
                            <el-option
                              v-for="item in article_opts"
                              :key="item.id"
                              :label="item.title"
                              :value="item.id">
                              <span style="float: left">{{ item.title }}</span>
                              <span style="float: right; color: #8492a6;">{{ item.editorial.name }} | {{ item.reporter_name }}</span>
                            </el-option>
                          </el-select>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Delete"
                      width="100"
                      >
                      <template slot-scope="scope">
                        <el-button icon='el-icon-remove' size="mini" type="danger" v-on:click="removeArticleRelateItem(scope.$index)">  </el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-form-item class="m-t-10">
                  <el-button v-on:click="addArticleRelateItem">Add Related News</el-button>                  
              </el-form-item>
            </el-form-item>
            <div class="gray-horizontal" hidden="true"></div>
            <el-form-item label="Author" hidden="true">
                <div>
                  <el-table
                    :data="article.article_authors"
                    style="width: 90%">
                    <el-table-column
                      label="Role"
                      prop="role_id"
                      width="300">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.role_id" placeholder="Pilih role">
                          <el-option
                              v-for="item in role_opts"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id" >
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="user_id"
                      label="Author"
                      width="500">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.user_id"  placeholder="Pilih User" style="width: 90%">
                          <el-option v-if='scope.row.notes === item.role'
                              v-for="item in author_opts"
                              :key="item.id"
                              :label="item.name +' - '+ item.instagram_username"
                              :value="item.id"
                              >
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <!-- <el-table-column
                      prop="social_media_id"
                      label="Sosial Media">
                      <template slot-scope="scope">
                        {{ scope.row.social_media_id }}
                      </template>
                    </el-table-column> -->
                  </el-table>
                </div>
                <!-- <el-form-item class="m-t-10">
                  <el-button>Add More Author</el-button>
                </el-form-item> -->
                <el-alert
                  v-if="!validAuthor"
                  title="error alert"
                  type="error"
                  center
                  show-icon>
                </el-alert>
            </el-form-item>
            
            <el-form-item label="Tanggal Publish">
                <el-col :span="11">
                <el-date-picker type="datetime" placeholder="Pick a date" v-model="article.publish_date" style="width: 100%;" format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                </el-col>
            </el-form-item>
            <div class="gray-horizontal"></div>
            <div class="spacer"></div>
            <el-form-item class="m-t-20">
                <el-button type="success" @click="onSubmit('articleForm',true,'Published')" v-if="action === 'edit'">Publish</el-button>
                <el-button type="danger" @click="onSubmit('articleForm',false,'Konten Berita Ditolak')" v-if="action === 'edit'">Tolak</el-button>                
            </el-form-item>
            <div class="gray-horizontal"></div>
            <div class="spacer"></div>
            <el-form-item class="m-t-20">
                <el-button type="primary" @click="onSubmit('articleForm',false,null)" v-if="action === 'edit'">Update</el-button>
                <el-button  @click="back()" >Cancel</el-button>
            </el-form-item>
        </el-form>
    
    </div>
</template>

<script>
// eslint-disable-next-line
// eslint-disable-indent

import { create, getArticleByID, update, getLatestArticleAll, getArticleImages } from '@/api/article'
import { getSections } from '@/api/section'
import { getArticleTypes } from '@/api/article_type'
import { getEditorialIdBySlug } from '@/api/editorial'
import { getCities } from '@/api/city'
import { getRoles } from '@/api/role'
import { getUsers } from '@/api/user'
import { getAuthorsByArticleID } from '@/api/author'
import { getRelatesByArticleID } from '@/api/relate'

import { mapGetters } from 'vuex'
import ImageUploader from '@/components/ImageUploader'
import ImageUploaderCrop from '@/components/ImageUploaderCrop'
import Tinymce from '@/components/Tinymce/index'
import moment from 'moment'

export default {
  name: 'MyForm',
  props: {
    editorialSlug: { type: String },
    articleType: { type: String },
    articleId: { type: String }
  },
  components: {
    ImageUploader,
    ImageUploaderCrop,
    Tinymce
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
      article: {
        title: '',
        editorial_id: null,
        slug: '',
        publish_date: null,
        published: false,
        teaser: null,
        content: null,
        main_image: null,
        section: null,
        article_tags: null,
        is_can_comment: true,
        active: true,
        article_type: null,
        images_count: 0,
        article_authors: [],
        article_relates: [],
        article_images: [],
        lock_by_id: null,
        city_id: null,
        reporter_id: null,
        editor_id: null,
        editorial: null
      },
      loading: {
        city: false
      },
      section_opts: [],
      article_type_opts: [],
      city_opts: [],
      role_opts: [],
      article_opts: [],
      tagArray: [],
      inputVisible: false,
      inputValue: '',
      keywordArray: [],
      keywordNonContentVisible: false,
      keywordNonContent: '',
      author_opts: [],
      author_social_id_opts: [],
      valute: '',
      rules: {
        title: [
          { required: true, message: 'Silahkan Isi judul', trigger: 'blur' }
        ],
        teaser: [
          { required: true, message: 'Silahkan Isi Ringkasan Utama', trigger: 'blur' }
        ],
        content: [
          { required: true, message: 'Silahkan Isi Berita', trigger: 'blur' }
        ],
        main_image: [
          { required: true, message: 'Silahkan Upload Gambar Utama', trigger: 'blur' }
        ]
      },
      validAuthor: true,
      action: 'add',
      main_image_name: '',
      tempCount: 0
    }
  },

  created() {
    this.init()
  },

  watch: {},

  methods: {
    onSubmit(formName, isPublished, status) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.article.article_type === 'video' || this.editorialSlug === 'infografis') {
            this.article.content = '-'
          }
          this.article.article_type = this.articleType
          this.article.article_tags = this.tagArray.toString()
          this.article.keyword_non_content = this.keywordArray.toString()
          this.article.content = this.article.content.replace('\u003cbody\u003e\n', '\u003cbody\u003e')
          this.article.content = this.article.content.replace('\n\u003c/body\u003e', '\u003c/body\u003e')
          // this.reporterNameCheck()
          this.article.reporter_name = this.name
          if (this.article.article_images) {
            this.article.images_count = this.article.article_images.length
          }
          if (this.action === 'add') {
            create(this.article)
              .then(response => {
                if (response.status === 201) {
                  this.$router.push({
                    path: '/moderation/artikel-kamu-list' + '/' + this.articleType + '/' + this.editorialSlug
                  })
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            if (status !== null) {
              this.article.status = status
            }
            this.article.published = isPublished
            this.article.publish_date = new Date(this.article.publish_date)
            update(this.article)
              .then(response => {
                if (response.status === 200) {
                  console.log('update success')
                  this.$router.push({
                    path: '/moderation/artikel-kamu-list' + '/' + this.articleType + '/' + this.editorialSlug
                  })
                }
              })
              .catch(error => {
                console.log(error)
              })
          }
        } else {
          console.error('failed to submit!!')
          this.$message.warning('Terjadi kesalahan pada pengisian form')
          return false
        }
      })
    },
    isValidateAuthor() {
      const isValid = true
      this.article.article_authors.forEach(element => {
        if (element.user_id === null) {
          this.validAuthor = false
          return false
        }
      })
      this.validAuthor = true
      return isValid
    },
    isValidateYoutubeLinkAuthor() {
      const isValid = true
      if (this.article.article_type === 'video' && !this.article.sources_path) {
        this.$message.warning('Silakan Isi Link Video Youtube Terlebih Dahulu')
        return false
      }
      return isValid
    },
    init() {
      moment.locale('id')
      this.article.publish_date = new Date()
      this.article.article_type = this.articleType
      this.getSectionOptions()
      this.getArticleTypeOptions()
      this.setEditorialId(this.editorialSlug)
      // this.getCityOptions()
      // this.getRoleOptions()
      // this.getUserOptions()
      if (this.articleType === 'y-news') {
        // this.getArticleOptions()
      }
      if (this.article.article_tags) {
        this.tagArray = this.article.article_tags.split(',')
      }
      if (this.article.keyword_non_content) {
        this.keywordArray = this.article.keyword_non_content.split(',')
      }
      if (this.articleId && this.articleId !== null) {
        this.getById(this.articleId)
        this.action = 'edit'
      } else {
        if (this.articleType === 'y-image') {
          this.article.article_images.push({ title: '', url: '', content: '-', active: true })
        }
      }
      this.article.reporter_name = this.name
    },
    getSectionOptions() {
      this.section_opts = getSections()
    },
    getArticleTypeOptions() {
      this.article_type_opts = getArticleTypes()
    },
    getCityOptions() {
      getCities().then(response => {
        if (response) {
          this.city_opts = response.data
        }
      })
    },
    getRoleOptions() {
      getRoles().then(response => {
        if (response) {
          this.role_opts = response.data
          if (this.action === 'add') {
            this.article.article_authors.forEach(element => {
              if (element.notes === 'reporter') {
                for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].code === 'public') {
                    element.role_id = response.data[i].id
                  }
                }
                element.user_id = this.user_id
              }
              if (element.notes === 'editor') {
                for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].code === 'public') {
                    element.role_id = response.data[i].id
                  }
                }
                element.user_id = this.user_id
              }
            })
          }
        }
      })
    },
    getArticleOptions() {
      const params = {}
      getLatestArticleAll(params).then(response => {
        if (response) {
          this.article_opts = response.data.data
        }
      })
    },
    getUserOptions() {
      getUsers().then(response => {
        this.author_opts = response.data
      })
    },
    setEditorialId(slug) {
      getEditorialIdBySlug({
        slug
      }).then(response => {
        this.article.editorial_id = response.data.id
      })
    },
    getById(articleID) {
      getArticleByID({
        articleID
      }).then(response => {
        if (response) {
          this.article = response.data
          this.article.content = this.article.content.replace('\u003c!DOCTYPE html\u003e\n\u003chtml\u003e\n\u003chead\u003e\n\u003c/head\u003e\n\u003cbody\u003e\n', '\u003c!DOCTYPE html\u003e\u003chtml\u003e\u003chead\u003e\u003c/head\u003e\u003cbody\u003e')
          this.article.content = this.article.content.replace('\n\u003c/body\u003e\n\u003c/html\u003e', '\u003c/body\u003e\u003c/html\u003e')
          this.article.content = this.article.content.replace('\u003cbody\u003e\n', '\u003cbody\u003e')
          this.article.content = this.article.content.replace('\n\u003c/body\u003e', '\u003c/body\u003e')
          if (this.article.article_tags) {
            this.tagArray = this.article.article_tags.split(',')
          }
          if (this.article.keyword_non_content) {
            this.keywordArray = this.article.keyword_non_content.split(',')
          }
          // get authors
          // this.getAuthors(this.article.id)
          // get relates
          // this.getRelates(this.article.id)
          if (this.article.main_image) {
            const aarName = this.article.main_image.split('/')
            this.main_image_name = aarName[aarName.length - 1]
          }
          if (this.article.article_type === 'y-image') {
            this.getImages(this.article.id)
          }
          if (this.article.publish_date) {
            this.article.publish_date = moment.utc(String(this.article.publish_date)).format('YYYY-MM-DD HH:mm:ss')
          }
        }
      })
    },
    getAuthors(articleID) {
      getAuthorsByArticleID({ articleID }).then(response => {
        if (response) {
          this.article.article_authors = response.data
        }
      })
    },
    getRelates(articleID) {
      getRelatesByArticleID({ articleID }).then(response => {
        if (response) {
          this.article.article_relates = response.data
        }
      })
    },
    getImages(article_id) {
      getArticleImages({ article_id }).then(response => {
        if (response) {
          this.article.article_images = response.data
          this.tempCount = 0
          this.article.article_images.forEach(item => {
            if (item.url.length > 1) {
              this.tempCount++
            }
          })
        }
      })
    },
    handleCloseTag(tag) {
      this.tagArray.splice(this.tagArray.indexOf(tag), 1)
    },
    showInputTag() {
      this.inputVisible = true
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus()
      })
    },
    handleInputTagConfirm() {
      const inputValue = this.inputValue
      if (inputValue) {
        this.tagArray.push(inputValue)
      }
      this.inputVisible = false
      this.inputValue = ''
    },
    handleCloseKeyword(tag) {
      this.keywordArray.splice(this.keywordArray.indexOf(tag), 1)
    },
    showInputKeyword() {
      this.keywordNonContentVisible = true
      this.$nextTick(_ => {
        this.$refs.saveKeywordInput.$refs.input.focus()
      })
    },
    handleInputKeywordConfirm() {
      const inputValue = this.keywordNonContent
      if (inputValue) {
        this.keywordArray.push(inputValue)
      }
      this.keywordNonContentVisible = false
      this.keywordNonContent = ''
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    generateSlug() {
      const a = 'àáäâèéëêìíïîòóöôùúüûñçßÿœæŕśńṕẃǵǹḿǘẍźḧ·/_,:;'
      const b = 'aaaaeeeeiiiioooouuuuncsyoarsnpwgnmuxzh------'
      const p = new RegExp(a.split('').join('|'), 'g')
      const d = new Date()
      const time = d.getTime()
      this.article.slug = time + '-' + this.article.title.toString().toLowerCase()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(p, c => b.charAt(a.indexOf(c))) // Replace special chars
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, '') // Trim - from end of text
    },
    back() {
      this.$router.push({
        path: '/moderation/artikel-kamu-list' + '/' + this.articleType + '/' + this.editorialSlug
      })
    },
    addArticleRelateItem() {
      const article = {
        article_id: null
      }
      if (this.article.article_relates) {
        article.sequence = this.article.article_relates.length + 1
        this.article.article_relates.push(article)
      } else {
        this.article.article_relates = []
        article.sequence = this.article.article_relates.length + 1
        this.article.article_relates.push(article)
      }
    },
    removeArticleRelateItem(idx) {
      this.article.article_relates.splice(idx, 1)
    },
    removeImages(idx) {
      this.article.article_images.splice(idx, 1)
      this.tempCount = 0
      this.article.article_images.forEach(item => {
        if (item.url.length > 1) {
          this.tempCount++
        }
      })
    },
    addImages() {
      const imgObj = { title: '', url: '', content: '-', active: true }
      if (this.article.article_images) {
        this.article.article_images.push(imgObj)
      } else {
        this.article.article_images = []
        this.article.article_images.push(imgObj)
      }
    },
    addArticleAuthorItem() {
      const author = {
        role_id: null,
        user_id: null,
        notes: 'reporter'
      }
      this.article.article_authors.push(author)
    },
    removeArticleAuthirtem(idx) {
      this.article.article_authors.splice(idx, 1)
      return
    },
    mainImageSuccessCallback(res) {
      if (res) {
        this.article.main_image = res[res.length - 1].url
        this.article.thumb_image = res[res.length - 1].url_thumb
        this.main_image_name = res[res.length - 1].filename
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
      }
    },
    gallerySuccessCallback(res) {
      if (res) {
        res.forEach(item => {
          this.article.article_images[item.index] = { title: item.filename, url: item.url, content: '-', active: true }
          if (item.index === 0) {
            this.article.main_image = item.url
            this.article.thumb_image = item.url_thumb
            this.main_image_name = item.filename
          }
        })
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
        this.tempCount = 0
        this.article.article_images.forEach(item => {
          if (item.url.length > 1) {
            this.tempCount++
          }
        })
      }
    },
    gallerySuccessCallbackOld(res) {
      if (res) {
        res.forEach(item => {
          this.article.article_images.push({ title: item.filename, url: item.url, content: '-', active: true })
        })
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
      }
    },
    reporterNameCheck() { // need to optimize
      this.article.article_authors.forEach(element => {
        if (element.notes === 'reporter') {
          this.author_opts.forEach(author => {
            if (author.id === element.user_id) {
              this.article.reporter_name = author.name
            }
          })
        }
      })
    },
    getAddressData(addressData, placeResultData, id) {
      const long_lat = addressData.longitude + ',' + addressData.latitude
      this.article.place = placeResultData.formatted_address
      this.article.place_long_lat = long_lat
    },
    getCityData(cityData, cityResultData, id) {
      this.article.city = cityResultData.formatted_address
      const long_lat = cityData.longitude + ',' + cityData.latitude
      this.article.city_long_lat = long_lat
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .longer-item-label {
    width: 180px;
  }
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .createPost-container {
    position: relative;
    .createPost-main-container {
      padding: 40px 45px 20px 50px;
      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;
        .postInfo-container-item {
          float: left;
        }
      }
      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;
        .editor-upload-btn-container {
            text-align: right;
            margin-right: 10px;
            .editor-upload-btn {
                display: inline-block;
            }
        }
      }
    }
    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }
  .gray-horizontal {
    border-bottom: solid 1px #e6e6e6;
  }
  .image-uploader-btn {
  display: inline-block;
  }
</style>