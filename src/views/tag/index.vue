<template>
  <div class="app-container">
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column label="Tag" width="150">
        <template slot-scope="scope">
          {{scope.row.name}}
        </template>
      </el-table-column>
      <el-table-column label="Description" >
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Type" width="110" align="center">
        <template slot-scope="scope">
          {{scope.row.type}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.active | statusFilter">{{scope.row.active}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.created_at}}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getAll } from '@/api/tag'

export default {
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        true: 'success',
        false: 'gray'
      }
      return statusMap[status]
    }
  },
  created() {
    this.getAll()
  },
  methods: {
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
