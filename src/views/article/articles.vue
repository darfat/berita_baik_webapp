<template>
  <div>
      <div> <h1> Test {{ editorialSlug }} </h1> </div>
      <div>
        <router-link :to="{ path: '/editorial-articles/new', params: { editorialSlug } }" >
          <el-button type="primary" >Create</el-button>
        </router-link>
      </div>
      <hr/>
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
      <!-- <el-table-column label="Teaser" >
        <template slot-scope="scope">
          <span>{{scope.row.teaser}}</span>
        </template>
      </el-table-column> -->
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
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
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
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
    }
  }
}
</script>