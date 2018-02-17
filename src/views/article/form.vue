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
        
        <el-form  class="form-container"  ref="articleForm" :model="article" :rules="rules" label-width="120px">
            <el-form-item label="Tanggal Publish">
                <el-col :span="11">
                <el-date-picker type="datetime" placeholder="Pick a date" v-model="article.publish_date" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="Type">
                <el-radio-group v-model="article.article_type">
                <el-radio v-for="item in article_type_opts"
                    :key="item.value"
                    :label="item.value"
                > {{ item.label }} </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Section">
                <el-select v-model="article.section" placeholder="Please select section">
                <el-option
                    v-for="item in section_opts"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value" >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Judul" prop="title">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="Slug">
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
                      <el-select v-model="article.city_id" placeholder="Please select kota">
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
                    <el-switch v-model="article.is_can_comment"></el-switch>
                  </el-form-item>
              </el-col>
              <el-col :span="12">
                  <!-- <el-form-item label="Keyword Non Content">
                      
                  </el-form-item> -->
              </el-col>
            </el-row>
            <el-form-item label="Published">
                <el-switch v-model="article.published"></el-switch>
            </el-form-item>
            <el-row :gutter="20">
              <el-col :span="6">
                <div></div>
              </el-col>
              <el-col :span="6">
                <div>
                  <span><strong> News : </strong> </span>
                </div>
              </el-col>
            </el-row>
            <el-form-item label="Related News">
            </el-form-item>
            <el-form-item label="Author">
                <div>
                  <el-table
                    :data="article.article_authors"
                    style="width: 100%">
                    <el-table-column
                      label="Role"
                      prop="role_id"
                      width="180">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.role_id" placeholder="Please select role">
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
                      prop="use_id"
                      label="Author"
                      width="180">
                      <template slot-scope="scope">
                        <el-select v-model="scope.row.user_id" placeholder="Please select author">
                          <el-option
                              v-for="item in author_opts"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id" >
                          </el-option>
                        </el-select>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="social_media_id"
                      label="Sosial Media">
                    </el-table-column>
                  </el-table>
                </div>
                <el-form-item class="m-t-10">
                  <el-button>Add More Author</el-button>
              </el-form-item>
            </el-form-item>
            <el-row :gutter="20">
            </el-row>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('articleForm')" v-if="action === 'add'">Create</el-button>
                <el-button type="primary" @click="onSubmit('articleForm')" v-if="action === 'edit'">Update</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    
    </div>
</template>

<script>
// eslint-disable-next-line
// eslint-disable-indent

import { create, getArticle, update } from '@/api/article'
import { getSections } from '@/api/section'
import { getArticleTypes } from '@/api/article_type'
import { getEditorialIdBySlug } from '@/api/editorial'
import { getCities } from '@/api/city'
import { getRoles } from '@/api/role'
import { getUsers } from '@/api/user'

import Tinymce from '@/components/Tinymce'

export default {
  name: 'ArticleForm',
  props: {
    editorialSlug: { type: String },
    articleId: { type: String }
  },
  components: {
    Tinymce
  },
  data() {
    return {
      article: {
        title: 'Test',
        editorial_id: null,
        slug: 'selug',
        publish_date: new Date(),
        published: false,
        teaser: '',
        content: '',
        status: 'draft',
        article_tags: null,
        is_can_comment: true,
        article_type: 'news',
        article_authors: [
          {
            role_id: null,
            user_id: null,
            social_media_id: '@test1'
          }
        ]
      },
      section_opts: [],
      article_type_opts: [],
      city_opts: [],
      role_opts: [],
      editorial_id: '',
      tagArray: [],
      inputVisible: false,
      inputValue: '',
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
    console.log('created')
    console.log(this.articleId)
    this.init()
  },

  watch: {},

  methods: {
    onSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.article.article_tags = this.tagArray.toString()
          if (this.action === 'add') {
            create(this.article)
              .then(response => {
                console.log('create success')
                this.$router.push({ path: '/editorial-articles/' + this.editorialSlug })
              })
              .catch(error => {
                console.log(error)
              })
          } else {
            update(this.article)
              .then(response => {
                console.log('update success')
                this.$router.push({ path: '/editorial-articles/' + this.editorialSlug })
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
      this.getSectionOptions()
      this.getArticleTypeOptions()
      this.setEditorialId(this.editorialSlug)
      this.getCityOptions()
      this.getRoleOptions()
      this.getUserOptions()
      if (this.article.article_tags) {
        this.tagArray = this.article.article_tags.split(',')
      }
      if (this.articleId && this.articleId !== null) {
        this.getArticleById(this.articleId)
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
        this.city_opts = response
      })
    },
    getRoleOptions() {
      getRoles().then(response => {
        this.role_opts = response
      })
    },
    getUserOptions() {
      getUsers().then(response => {
        this.author_opts = response
      })
    },
    setEditorialId(slug) {
      getEditorialIdBySlug({
        slug
      }).then(response => {
        this.editorial_id = response.id
        this.article.editorial_id = this.editorial_id
      })
    },
    getArticleById(articleId) {
      getArticle({
        articleId
      }).then(response => {
        console.log('response get article')
        console.log(response)
        this.article = response
        if (this.article.article_tags) {
          this.tagArray = this.article.article_tags.split(',')
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
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

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
</style>