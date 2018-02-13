<template>
  <div>
      <div> <h1> Test {{ editorialSlug }} </h1> </div>
      <div class="m-b-10">
        <router-link :to="{ path: '/editorial-articles/new-article-'+editorialSlug, params: { editorialSlug } }" >
          <el-button type="primary" >Create</el-button>
        </router-link>
      </div>
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column label="Title" >
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Slug" width="150">
        <template slot-scope="scope">
          {{scope.row.slug}}
        </template>
      </el-table-column>
      <el-table-column label="Tags" >
        <template slot-scope="scope">
          <el-tag v-if="scope.row.article_tags"
            v-for="tag in scope.row.article_tags.split(',')"
            :key="tag"
            >
            {{tag}}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.published | statusFilter"> {{getPublishedStatus(scope.row.published)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="publish_date" label="Published Date" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.publish_date}}</span>
        </template>
      </el-table-column>
    </el-table>
</div>
</template>

<script>
import { getAll } from '@/api/article'
import { getListByEditorialSlug } from '@/api/article'

export default {
  name: 'articles',
  props: {
    editorialSlug: {
      type: String
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(isPublished) {
      const statusMap = {
        true: 'success',
        false: 'danger'
      }
      return statusMap[isPublished]
    }
  },
  created() {
    this.getListByEditorialSlug(this.editorialSlug)
  },
  methods: {
    getListByEditorialSlug(editorialSlug) {
      this.listLoading = true
      getListByEditorialSlug({ editorialSlug }).then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    getAll() {
      this.listLoading = true
      getAll(this.listQuery).then(response => {
        this.list = response
        this.listLoading = false
      })
    },
    getPublishedStatus(isPublished) {
      if (isPublished === true) {
        return 'Published'
      } else {
        return 'Draft'
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-tag + .el-tag {
    margin-left: 10px;
  }

</style>