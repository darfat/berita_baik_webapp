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
            <el-form-item label="Sub Judul" >
                <el-input v-model="article.subtitle" :maxlength="50" ></el-input>
            </el-form-item>
            
            <el-form-item label="Ringkasan Utama" prop="teaser">
              <div class="editor-container">
                 <el-input type="textarea" :rows="4" v-model="article.teaser" :maxlength="500" ></el-input>
                <!-- <tinymce :height="100" v-model="article.teaser" ref="editor"  id='teaser' ></tinymce> -->
              </div>
            </el-form-item>
            <el-form-item label="Isi" prop="content">
              <!-- <tinymce :height="400" v-model="article.content" ref="editor"  id='content'   ></tinymce> -->
              <froala :tag="'textarea'" :config="froalaConfig" v-model="article.content"></froala>
            </el-form-item>
            <el-form-item label="Gambar Utama"  prop="main_image" >
              <div>
                <span> {{ main_image_name }}</span>
                <image-uploader :isMultiple="false" class="image-uploader-btn" @successCBK="mainImageSuccessCallback"></image-uploader>
              </div>
              <div>
              <div slot="tip" class="el-upload__tip">Maks 2MB dan Nama File Gambar Utama Tidak Boleh Ada Spasi</div>
              </div>
            </el-form-item>
            <el-form-item label="Gallery" v-if="article.article_type === 'image'">
              <div class="gray-horizontal"></div>
              <image-uploader :isMultiple="true" class="image-uploader-btn" @successCBK="gallerySuccessCallback"></image-uploader>
              <div class="gray-horizontal"></div>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                  <el-form-item label="Kota">
                      <!-- <el-select v-model="article.city_id" placeholder="Pilih kota">
                        <el-option
                            v-for="item in city_opts"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                        </el-option>
                      </el-select> -->
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
            <el-row :gutter="20">
              <el-col :span="6" style="padding-left:63px">
                <div>
                  <span><strong> News </strong> </span>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="Related News">
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
                <el-date-picker type="datetime" placeholder="Pick a date" v-model="article.publish_date" style="width: 100%;"></el-date-picker>
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

import { create, getArticleByID, update, getLatestNewsAll } from '@/api/article'
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
import VueGoogleAutocomplete from 'vue-google-autocomplete'

export default {
  name: 'ArticleForm',
  props: {
    editorialSlug: { type: String },
    articleType: { type: String },
    articleId: { type: String }
  },
  components: {
    ImageUploader,
    VueGoogleAutocomplete
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
        publish_date: new Date(),
        published: true,
        teaser: null,
        content: null,
        main_image: null,
        section: null,
        article_tags: null,
        is_can_comment: true,
        active: true,
        article_type: null,
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
      froalaConfig: {
        events: {
          'froalaEditor.initialized': function() {
            console.log('initialized')
          }
        },
        imageManagerLoadURL: 'http://beritabaik.id/dev/static/upload/content/images/'
      }
    }
  },

  created() {
    this.init()
  },

  watch: {},

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid && this.isValidateAuthor()) {
          this.article.article_type = this.articleType
          this.article.article_tags = this.tagArray.toString()
          this.article.keyword_non_content = this.keywordArray.toString()
          this.reporterNameCheck()
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
            update(this.article)
              .then(response => {
                console.log(response)
                if (response.status === 200) {
                  console.log('update success')
                  this.$router.push({ path: '/editorial-articles/l/' + this.editorialSlug })
                }
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
    init() {
      this.article.article_type = this.articleType
      this.getSectionOptions()
      this.getArticleTypeOptions()
      this.setEditorialId(this.editorialSlug)
      this.getCityOptions()
      this.getRoleOptions()
      this.getUserOptions()
      this.getArticleOptions()
      if (this.article.article_tags) {
        this.tagArray = this.article.article_tags.split(',')
      }
      if (this.article.keyword_non_content) {
        this.keywordArray = this.article.keyword_non_content.split(',')
      }
      if (this.articleId && this.articleId !== null) {
        this.getById(this.articleId)
        this.action = 'edit'
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
      getLatestNewsAll(params).then(response => {
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

      this.article.slug = this.article.title.toString().toLowerCase()
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
      console.log('mainImageSuccessCallback : ', res)
      if (res) {
        this.article.main_image = res[res.length - 1].url
        this.main_image_name = res[res.length - 1].filename
        this.$message({
          type: 'success',
          message: 'Foto Berhasil Diupload'
        })
      }
    },
    gallerySuccessCallback(res) {
      console.log('gallerySuccessCallback ', res)
      if (res) {
        res.forEach(item => {
          console.log(item.url)
          this.article.article_images.push({ title: item.filename, url: item.url, content: '-', active: true })
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
      console.log(this.article.place)
      console.log(this.article.place_long_lat)
    },
    getCityData(cityData, cityResultData, id) {
      this.article.city = cityResultData.formatted_address
      const long_lat = cityData.longitude + ',' + cityData.latitude
      this.article.city_long_lat = long_lat
      console.log(this.article.city_long_lat)
      console.log(this.article.city)
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