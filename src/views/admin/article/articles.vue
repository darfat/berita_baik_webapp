<template>
  <div class="app-container calendar-list-container">
      <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="Title">
      </el-input>
      <!-- <el-select clearable style="width: 90px" class="filter-item" v-model="listQuery.importance" placeholder="Author">
        <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
        </el-option>
      </el-select> -->
      <!-- <el-select clearable class="filter-item" style="width: 130px" placeholder="Author">
        <el-option v-for="item in  calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
        </el-option>
      </el-select> -->
      <el-button class="filter-item" type="primary"  icon="el-icon-search" @click="handleFilter">Search</el-button>
      <router-link class="filter-item" :to="{ name: 'admin-article-form', params: { editorialSlug, articleType } }" >
        <el-button type="primary" >Create</el-button>
      </router-link>    
      </div>
    
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row style="width: 100%"> 
      <el-table-column  align="right"
        type="index"
        width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column label="Title" >
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Author / Published By"   width="150" >
        <template slot-scope="scope">
          {{scope.row.reporter_name}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.published | statusFilter"> {{getPublishedStatus(scope.row.published)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="publish_date" label="Created Date" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at | formatDate }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Status" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.published" @change="updatePublished(scope.row.id,scope.row.published)" active-text="Publish" inactive-text="Draft" active-color="#13ce66" inactive-color="#ff4949" ></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="Actions" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link class="filter-item" :to="{ name: 'admin-article-form', params: { editorialSlug, articleType, 'articleId': scope.row.id} }" >
            <el-button type="primary" size="mini" >Edit</el-button>
          </router-link>
          <el-button type="danger" size="mini" >Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      layout="prev, pager, next"
      :page-size="per_page"
      :total="total_entries_size">
    </el-pagination>
</div>
</template>

<script>
import { getListByEditorialSlug, updatePublished } from '@/api/article'

export default {
  name: 'articles',
  props: {
    editorialSlug: { type: String },
    articleType: { type: String }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      per_page: 10,
      page: 1,
      total_pages: 1,
      total_entries_size: 0
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
    this.getArticlesByEditorialSlug(this.editorialSlug, this.page)
  },
  methods: {
    getArticlesByEditorialSlug(editorialSlug, page) {
      this.listLoading = true
      getListByEditorialSlug({
        editorialSlug,
        page: page,
        per_page: this.per_page
      }).then(response => {
        if (response) {
          this.list = response.data.data
          this.per_page = response.data.per_page
          this.total_pages = response.data.total_pages
          this.total_entries_size = response.data.total_entries_size
          this.page = response.data.page
        }
        this.listLoading = false
      })
    },
    getPublishedStatus(isPublished) {
      if (isPublished === true) {
        return 'Published'
      } else {
        return 'Draft'
      }
    },
    handleSizeChange(val) {
      console.log(`${val} items per page`)
    },
    handleCurrentChange(page) {
      console.log(`current page: ${page}`)
      this.getArticlesByEditorialSlug(this.editorialSlug, page)
    },
    handleUpdate(row) {
      const data = Object.assign({}, row) // copy obj
      console.log(data)
    },
    handleFilter() {
      // const data = Object.assign({}, row) // copy obj
    },
    updatePublished(article_id, published) {
      console.log('updatePublished ' + article_id)
      updatePublished({
        article_id,
        published
      }).then(response => {
        if (response) {
          console.log(response.data)
        }
      })
    },
    indexMethod(index) {
      return (this.per_page * (this.page - 1)) + (index + 1)
    }
  }
}

</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .el-tag + .el-tag {
    margin-left: 10px;
  }

  .filter-container {
    padding-bottom: 10px;
    .filter-item {
      display: inline-block;
      vertical-align: middle;
      margin-bottom: 10px;
    }
  }

  
</style>