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
      <router-link class="filter-item" :to="{ name: 'admin-article-form', params: { editorialSlug} }" >
        <el-button type="primary" >Create</el-button>
      </router-link>    
      </div>
    
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row style="width: 100%"> 
      <el-table-column label="Title" >
        <template slot-scope="scope">
          {{scope.row.title}}
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
          <span>{{scope.row.publish_date }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link class="filter-item" :to="{ name: 'admin-article-form', params: { editorialSlug, 'articleId': scope.row.id} }" >
            <el-button type="primary" size="mini" >Edit</el-button>
          </router-link>
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
        this.list = response.data
        this.listLoading = false
      })
    },
    getAll() {
      this.listLoading = true
      getAll(this.listQuery).then(response => {
        this.list = response.data
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
    handleUpdate(row) {
      const data = Object.assign({}, row) // copy obj
      console.log(data)
    },
    handleFilter() {
      // const data = Object.assign({}, row) // copy obj
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