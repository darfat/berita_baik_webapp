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
                <div>
                  <el-input v-model="article.title"  v-on:change="generateSlug" :maxlength="65" ></el-input>
                  <span slot="tip" class="el-upload__tip" v-if="article && article.title"> Jumlah Huruf : {{article.title.length}}</span>
                </div>
            </el-form-item>
            <el-form-item label="Sub Judul" v-if="article.article_type === 'news'" >
                <el-input v-model="article.subtitle" :maxlength="50" ></el-input>
            </el-form-item>
            <el-form-item label="Slug" v-if="article.article_type === 'news' || article.article_type === 'image'" >
                <el-input v-model="article.slug" :maxlength="120" ></el-input>
            </el-form-item>
            <el-form-item label="Ringkasan Utama" prop="teaser" v-if="article.article_type === 'news' || article.article_type === 'image'" >
              <div class="editor-container">
                 <el-input type="textarea" :rows="4" v-model="article.teaser" :maxlength="250" ></el-input>
              </div>
            </el-form-item>
            <el-form-item label="Isi" prop="content" v-if="article.article_type !== 'video' && editorialSlug !== 'infografis'">
              <div>
              <tinymce :height="400" v-model="article.content" ref="editor"  id='content'   ></tinymce>
              <!-- <froala :tag="'textarea'" :config="froalaConfig" v-model="article.content"></froala> -->
              <div slot="tip" class="el-upload__tip"> Tag &lt;related/&gt; : untuk menambahkan Berita Terkait di dalam konten </div>
              </div>
            </el-form-item>
            <el-form-item label="Gambar Utama"  prop="main_image" v-if="article.article_type === 'news' || editorialSlug === 'infografis'" >
              <div>
                <span> {{ main_image_name }}</span>
                <image-uploader v-if="editorialSlug === 'infografis'" :isMultiple="false" class="image-uploader-btn" @successCBK="mainImageSuccessCallback"></image-uploader>
                <image-uploader-crop v-else class="image-uploader-btn" :compress="0.7" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" @successCBK="mainImageSuccessCallback"></image-uploader-crop>
              </div>
              <div>
              <div slot="tip" class="el-upload__tip">Maks 4MB dan Nama File Gambar Utama Tidak Boleh Ada Spasi | Ukuran foto original disarankan diatas 2MB</div>
              </div>
            </el-form-item>
            <el-form-item label="Gallery" v-if="article.article_type === 'image' && editorialSlug === 'gallery-foto'">
              <div class="gray-horizontal"></div>
              <div>
                <div> <small> Main Image : <span> {{ main_image_name }}</span> </small></div>
                <div v-if="article.article_images && article.article_images.length > 0">
                  {{tempCount}} / {{article.article_images.length}} Foto Berhasil Diupload
                </div>
                <!-- <image-uploader :isMultiple="true" :limit=5 class="image-uploader-btn" @successCBK="gallerySuccessCallback"></image-uploader> -->
                <div v-for="(item, index) in article.article_images" :key="index">
                  <span>{{item.title}}</span>
                  <image-uploader-crop  class="image-uploader-btn" :compress="0.7" :sizeLimit="4000000" :sizeLimitMessage="'4MB'" :index="index" @successCBK="gallerySuccessCallback"></image-uploader-crop>
                  <el-button icon='el-icon-remove' size="mini" type="danger" v-on:click="removeImages(index)">  </el-button>
                </div>
                <div slot="tip" class="el-upload__tip" ref="divTipImages">Maks 4MB Per Foto dan Nama File Gambar Utama Tidak Boleh Ada Spasi</div>
                <div class="gray-horizontal"></div>
                <div class="m-t-10">
                    <el-button class="primary" v-on:click="addImages">Tambah Gambar</el-button>
                </div>
                
              </div>
            </el-form-item>
            <el-form-item label="Youtube Embed"  prop="sources_path" v-if="article.article_type === 'video'" >
              <div>
                <el-input v-model="article.sources_path"  :maxlength="100" ></el-input>
                <div slot="tip" class="el-upload__tip">Copy seluruh link contoh : <i>https://www.youtube.com/watch?v=FlsCjmMhFmw</i></div>
              </div>
            </el-form-item>
            <div class="gray-horizontal"></div>
            <div class="spacer m-t-10"></div>
            <el-row :gutter="20"  v-if="editorialSlug === 'infografis'">
              <el-col :span="12">
                  <el-form-item label="Copywriter">
                     <el-input v-model="article.copywriter" :maxlength="100" ></el-input>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="Designer">
                    <el-input v-model="article.designer" :maxlength="100" ></el-input>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                  <el-form-item label="Kota">
                      <vue-google-autocomplete
                          id="map2"
                          ref="city"
                          classname="el-input"
                          placeholder="Cari Kota"
                          v-on:placechanged="getCityData"
                          types="(cities)"
                          country="id"
                          :value="article.city"
                      >
                      </vue-google-autocomplete>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="Lokasi">
                    <vue-google-autocomplete 
                        ref="place"
                        id="map"
                        classname="el-input"
                        placeholder="Cari Lokasi..."
                        v-on:placechanged="getAddressData"
                        country="id"
                        :value="article.place"
                    >
                    </vue-google-autocomplete>
                  </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                  <el-form-item label="Komentar Pembaca">
                    <el-switch v-model="article.is_can_comment" active-text="Iya" inactive-text="Tidak"></el-switch>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="Keyword non Content">
                    <el-tag
                    :key="keyword"
                    v-for="keyword in keywordArray"
                    closable
                    :disable-transitions="false"
                    @close="handleCloseKeyword(keyword)">
                    {{keyword}}
                    </el-tag>
                    <el-input
                    class="input-new-tag"
                    v-if="keywordNonContentVisible"
                    v-model="keywordNonContent"
                    ref="saveKeywordInput"
                    size="mini"
                    @keyup.enter.native="handleInputKeywordConfirm"
                    @blur="handleInputKeywordConfirm"
                    >
                    </el-input>
                    <el-button v-else class="button-new-tag" size="small" @click="showInputKeyword">+ New Keyword</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="12">
                  <el-form-item label="Published">
                      <el-switch v-model="article.published" active-text="Publish" inactive-text="Draft" ></el-switch>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
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
              </el-col>
            </el-row>
            <div class="gray-horizontal"></div>
            <el-row :gutter="20" v-if="article.article_type === 'news'">
              <el-col :span="6" style="padding-left:63px">
                <div>
                  <span><strong> News </strong> </span>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="Related News" v-if="article.article_type === 'news'">
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
            <div class="gray-horizontal"></div>
            <el-form-item label="Author">
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
                          <el-option v-if='"public" !== item.role'
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
                      prop="contributor"
                      label="">
                       <template slot-scope="scope">
                      </template>
                    </el-table-column> -->
                  </el-table>

                </div>
                <el-row>
                    <el-col :span="8">
                      <el-checkbox v-model="article.is_use_contributor">Kontributor</el-checkbox>
                      <el-input v-if="article.is_use_contributor" v-model="article.reporter_name" :maxlength="100" placeholder="Silakan input nama kontributor"></el-input>
                    </el-col> 
                </el-row>
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
                <el-button type="primary" @click="onSubmit('articleForm')" v-if="action === 'add'">Create</el-button>
                <el-button type="primary" @click="onSubmit('articleForm')" v-if="action === 'edit'">Update</el-button>
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
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import Tinymce from '@/components/Tinymce/index'
import moment from 'moment'

export default {
  name: 'ArticleForm',
  props: {
    editorialSlug: { type: String },
    articleType: { type: String },
    articleId: { type: String }
  },
  components: {
    ImageUploader,
    ImageUploaderCrop,
    VueGoogleAutocomplete,
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
        teaser: '',
        editorial_id: null,
        slug: '',
        publish_date: null,
        published: true,
        content: null,
        main_image: null,
        section: null,
        article_tags: null,
        is_can_comment: true,
        active: true,
        article_type: null,
        images_count: 0,
        is_use_contributor: false,
        article_authors: [
          {
            role_id: null,
            notes: 'reporter'
          },
          {
            role_id: null,
            notes: 'editor'
          }
          // {
          //   role_id: null,
          //   notes: 'writer'
          // }
        ],
        article_relates: [],
        article_images: [],
        lock_by_id: null,
        city_id: null,
        reporter_id: null,
        editor_id: null,
        editorial: null,
        viewed_count: 0,
        shared_count: 0,
        liked_count: 0
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
        // teaser: [
        //   { required: true, message: 'Silahkan Isi Ringkasan Utama', trigger: 'blur' }
        // ],
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
      tempCount: 0,
      titleLetterCount: 0
    }
  },

  created() {
    this.init()
  },

  watch: {},

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.isValidateAuthor() && this.isValidateYoutubeLinkAuthor()) {
          if (this.article.article_type === 'video' || this.editorialSlug === 'infografis') {
            this.article.content = '-'
          }
          if (this.article.article_type === 'news' && this.article.teaser.length < 1) {
            this.$message.warning('Ringkasan Utama Belum Diisi')
            return false
          }
          this.article.article_type = this.articleType
          this.article.article_tags = this.tagArray.toString()
          this.article.keyword_non_content = this.keywordArray.toString()
          this.article.content = this.article.content.replace('\u003cbody\u003e\n', '\u003cbody\u003e')
          this.article.content = this.article.content.replace('\n\u003c/body\u003e', '\u003c/body\u003e')
          this.reporterNameCheck()
          if (this.article.article_images) {
            this.article.images_count = this.article.article_images.length
          }
          if (this.action === 'add') {
            create(this.article)
              .then(response => {
                if (response.status === 201) {
                  this.$router.push({ path: '/editorial-articles/l/' + this.editorialSlug })
                }
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            this.article.publish_date = new Date(this.article.publish_date)
            update(this.article)
              .then(response => {
                if (response.status === 200) {
                  this.$router.push({ path: '/editorial-articles/l/' + this.editorialSlug })
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
      this.article.user_id = this.user_id
      this.getSectionOptions()
      this.getArticleTypeOptions()
      this.setEditorialId(this.editorialSlug)
      this.getCityOptions()
      this.getRoleOptions()
      this.getUserOptions()
      if (this.articleType === 'news') {
        this.getArticleOptions()
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
        if (this.articleType === 'image') {
          this.article.article_images.push({ title: '', url: '', content: '-', active: true })
        }
      }
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
                  if (response.data[i].code === 'reporter') {
                    element.role_id = response.data[i].id
                  }
                }
              }
              if (element.notes === 'editor') {
                for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].code === 'editor') {
                    element.role_id = response.data[i].id
                  }
                }
                element.user_id = this.user_id
              }
              if (element.notes === 'writer') {
                for (let i = 0; i < response.data.length; i++) {
                  if (response.data[i].code === 'writer') {
                    element.role_id = response.data[i].id
                  }
                }
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
          this.getAuthors(this.article.id)
          // get relates
          this.getRelates(this.article.id)
          if (this.article.main_image) {
            const aarName = this.article.main_image.split('/')
            this.main_image_name = aarName[aarName.length - 1]
          }
          if (this.article.article_type === 'image') {
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
      this.$router.push({ path: '/editorial-articles/l/' + this.editorialSlug })
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
      if (this.article.is_use_contributor === false) {
        this.article.article_authors.forEach(element => {
          if (element.notes === 'reporter') {
            this.author_opts.forEach(author => {
              if (author.id === element.user_id) {
                this.article.reporter_name = author.name
              }
            })
          }
        })
      }
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
    },
    countTitleLetter() {
      if (this.article && this.article.title) {
        this.titleLetterCount = this.article.title.length
      }
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