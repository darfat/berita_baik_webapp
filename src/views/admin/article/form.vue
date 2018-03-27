<template>
    <div class="createPost-container">
        <div> 
          <!-- <el-alert
            title="success alert"
            type="success"
            description=""
            show-icon>
          </el-alert>   -->
        </div>
        
        <el-form  class="form-container"  ref="articleForm" :model="article" :rules="rules" label-width="150px">
            <el-form-item label="Tanggal Publish">
                <el-col :span="11">
                <el-date-picker type="datetime" placeholder="Pick a date" v-model="article.publish_date" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="Type" hidden="true">
                <el-radio-group v-model="article.article_type">
                <el-radio v-for="item in article_type_opts"
                    :key="item.value"
                    :label="item.value"
                > {{ item.label }} </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Section">
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
                <el-input v-model="article.title"  v-on:change="generateSlug"></el-input>
            </el-form-item>
            <el-form-item label="Judul Atas" >
                <el-input v-model="article.slug"></el-input>
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
            <el-form-item label="Ringkasan Utama">
              <div class="editor-container">
                <tinymce :height="100" v-model="article.teaser" ref="editor"  id='teaser'></tinymce>
              </div>
            </el-form-item>
            <el-form-item label="Isi">
              <tinymce :height="400" v-model="article.content" ref="editor"  id='content'></tinymce>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="12">
                  <el-form-item label="Kota">
                      <el-select v-model="article.city_id" placeholder="Pilih kota">
                        <el-option
                            v-for="item in city_opts"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id" >
                        </el-option>
                      </el-select>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <el-form-item label="Lokasi">
                    <el-input v-model="article.place"></el-input>
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
                    style="width: 90%">
                    <el-table-column
                      label="Article"
                      prop="article_id"
                      >
                      <template slot-scope="scope">
                        <div>
                          {{ scope.row.article_id }}
                        </div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
                <el-form-item class="m-t-10">
                  <el-button>Add Related News</el-button>
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
                        <el-select v-model="scope.row.user_id"  placeholder="Pilih author" style="width: 90%">
                          <el-option
                              v-for="item in author_opts"
                              :key="item.id"
                              :label="item.name +' - '+ item.username"
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
                <el-form-item class="m-t-10">
                  <el-button>Add More Author</el-button>
              </el-form-item>
            </el-form-item>
            <div class="gray-horizontal"></div>
            <div class="spacer"></div>
            <el-form-item>
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

import { create, getArticleByID, update } from '@/api/article'
import { getSections } from '@/api/section'
import { getArticleTypes } from '@/api/article_type'
import { getEditorialIdBySlug } from '@/api/editorial'
import { getCities } from '@/api/city'
import { getRoles } from '@/api/role'
import { getUsers } from '@/api/user'
import { getAuthorsByArticleID } from '@/api/author'
import { getRelatesByArticleID } from '@/api/relate'

import Tinymce from '@/components/Tinymce'

export default {
  name: 'ArticleForm',
  props: {
    editorialSlug: { type: String },
    articleType: { type: String },
    articleId: { type: String }
  },
  components: {
    Tinymce
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
        content: '<p>content</p>',
        main_image: 'static/upload/images/2.jpg',
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
        ],
        article_relates: [{ article_id: '00000000-0000-0000-0000-000000000013' }],
        lock_by_id: null,
        city_id: null,
        reporter_id: null,
        editor_id: null,
        editorial: null

      },
      section_opts: [],
      article_type_opts: [],
      city_opts: [],
      role_opts: [],
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
          { required: true, message: 'Silahkan isi judul', trigger: 'blur' }
        ]
      },
      action: 'add'
    }
  },

  created() {
    this.init()
  },

  watch: {},

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.article.article_tags = this.tagArray.toString()
          this.article.keyword_non_content = this.keywordArray.toString()
          if (this.action === 'add') {
            create(this.article)
              .then(response => {
                console.log('create success')
                this.$router.push({ path: '/editorial-articles/l/' + this.editorialSlug })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            update(this.article)
              .then(response => {
                console.log('update success')
                this.$router.push({ path: '/editorial-articles/l/' + this.editorialSlug })
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
    init() {
      this.article.article_type = this.articleType
      this.getSectionOptions()
      this.getArticleTypeOptions()
      this.setEditorialId(this.editorialSlug)
      this.getCityOptions()
      this.getRoleOptions()
      this.getUserOptions()
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
              console.log(element.notes)
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
              }
            })
          }
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
        console.log(response.data)
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
          console.log(this.article.article_relates)
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
    setAuthor(row) {
      console.log('row ', row.user.username)
      row.user_id = row.user.id
      row.social_media_id = row.user.username
      row.social_media_type = 'instagram'
    },
    back() {
      this.$router.push({ path: '/editorial-articles/l/' + this.editorialSlug })
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
</style>