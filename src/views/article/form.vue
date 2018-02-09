<template>
    <div>
        <div> 
          <!-- <el-alert
            title="success alert"
            type="success"
            description=""
            show-icon>
          </el-alert>   -->
        </div>
        
        <el-form ref="form" :model="article" label-width="120px">
            <el-form-item label="Tanggal Publish">
                <el-col :span="11">
                <el-date-picker type="datetime" placeholder="Pick a date" v-model="article.publish_date" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="Type">
                <el-radio-group v-model="article.article_type_id">
                <el-radio v-for="item in article_type_opts"
                    :key="item.id"
                    :label="item.id"
                > {{ item.name }} </el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Section">
                <el-select v-model="article.section_id" placeholder="Please select section">
                <el-option
                    v-for="item in section_opts"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id" >
                </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Judul">
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
              <tinymce :height="100" v-model="article.teaser" id='teaser'></tinymce>
            </el-form-item>
            <el-form-item label="Isi">
              <tinymce :height="350" v-model="article.content" id='content'></tinymce>
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
              
            </el-form-item>
          
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    
    </div>
</template>

<script>
// eslint-disable-next-line
// eslint-disable-indent

import { create } from '@/api/article'
import { getSections } from '@/api/section'
import { getArticleTypes } from '@/api/article_type'
import { getEditorialIdBySlug } from '@/api/editorial'
import { getCities } from '@/api/city'

import Tinymce from '@/components/Tinymce'

export default {
  name: 'ArticleForm',
  props: {
    editorialSlug: {
      type: String
    }
  },
  components: {
    Tinymce
  },
  data() {
    return {
      article: {
        title: 'Default Title 123asdasd asdasd!!!',
        editorial_id: null,
        slug: 'selug',
        publish_date: new Date(),
        published: false,
        teaser: '',
        content: '',
        status: 'draft',
        article_tags: 'asdf,123,asds',
        is_can_comment: true
      },
      section_opts: [],
      article_type_opts: [],
      city_opts: [],
      editorial_id: '',
      tagArray: [],
      inputVisible: false,
      inputValue: '',
      author_type_opts: [
        {
          value: 'reporter',
          label: 'Reporter'
        },
        {
          value: 'editor',
          label: 'Editor'
        }
      ],
      author_opts: [],
      author_social_id_opts: [],
      valute: ''
    }
  },

  created() {
    this.init()
  },

  watch: {},

  methods: {
    onSubmit() {
      this.article.article_tags = this.tagArray.toString()
      create(this.article)
        .then(response => {
          console.log('success')
          this.$router.push({ path: '/cms' })
        })
        .catch(error => {
          console.log(error)
        })
    },

    init() {
      this.getSectionOptions()
      this.getArticleTypeOptions()
      this.setEditorialId(this.editorialSlug)
      this.getCityOptions()
      this.tagArray = this.article.article_tags.split(',')
    },
    getSectionOptions() {
      getSections().then(response => {
        this.section_opts = response
      })
    },
    getArticleTypeOptions() {
      getArticleTypes().then(response => {
        this.article_type_opts = response
      })
    },
    getCityOptions() {
      getCities().then(response => {
        this.city_opts = response
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
    }
  }
}

</script>

<style>
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
</style>