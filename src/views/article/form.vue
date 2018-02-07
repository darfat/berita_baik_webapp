<template>
    <div>
        <div> <h1> {{editorialSlug}} </h1> </div>
        <el-form ref="form" :model="article" label-width="120px">
            <el-form-item label="Title">
                <el-input v-model="article.title"></el-input>
            </el-form-item>
            <el-form-item label="Slug">
                <el-input v-model="article.slug"></el-input>
            </el-form-item>
            <el-form-item label="Section">
                <el-select v-model="article.section_id" placeholder="Please select section">
                <el-option label="Nasional" value="781cb12a-8f41-4afe-9a8a-1c82c1df053f"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="Publish Date">
                <el-col :span="11">
                <el-date-picker type="datetime" placeholder="Pick a date" v-model="article.publish_date" style="width: 100%;"></el-date-picker>
                </el-col>
            </el-form-item>
            <el-form-item label="Published">
                <el-switch v-model="article.published"></el-switch>
            </el-form-item>
            <el-form-item label="Type">
                <el-radio-group v-model="article.article_type_id">
                <el-radio label="8e6a9c11-2724-473b-a593-c009ab3d5493" >News</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Content">
                <el-input type="textarea" v-model="article.content"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    
    </div>
</template>

<script>
import { create } from '@/api/article'

export default {
  data() {
    return {
      article: {
        title: 'Default Title 123asdasd asdasd!!!',
        section_id: '',
        editorial_id: '',
        slug: '',
        publish_date: '',
        article_type_id: '',
        published: false,
        content: ''
      }
    }
  },

  created() {
  },

  props: ['editorialSlug'],

  watch: {},

  methods: {
    onSubmit() {
      console.log('submit!')
      const strJ = JSON.stringify(this.article)
      console.log(strJ)
      create(this.article.title, this.article.content)
        .then(response => {
          console.log(response)
        })
    }
  }
}
</script>