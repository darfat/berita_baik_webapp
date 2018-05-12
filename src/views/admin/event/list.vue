<template>
  <div class="app-container">
    <div class="filter-container">
      <router-link class="filter-item" :to="{ name: 'event-form' }" >
        <el-button type="primary" >Create</el-button>
      </router-link>    
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <!-- <el-table-column align="center" label='ID' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column> -->
      <el-table-column label="Title" width="150">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Description" >
        <template slot-scope="scope">
          <span>{{scope.row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="event_date" label="Date" width="210">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.date | formatDateOnly}} - {{scope.row.end_date | formatDateOnly}}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.is_premium | statusFilter"> {{getPremiumStatus(scope.row.is_premium)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link class="filter-item" :to="{ name: 'event-form', params: { 'eventId': scope.row.id} }" >
            <el-button type="primary" size="mini" >Edit</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="deleteRow(scope.row.id)" >Delete</el-button>
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
import { getAll, destroy } from '@/api/event'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      per_page: 15,
      page: 1,
      total_pages: 1,
      total_entries_size: 0
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
    this.getAll(1)
  },
  methods: {
    getAll(page) {
      this.listLoading = true
      getAll({
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
    getPremiumStatus(isPremium) {
      if (isPremium === true) {
        return 'Premium'
      } else {
        return 'Standar'
      }
    },
    deleteRow(eventID) {
      this.$confirm('Apakah anda yakin akan menghapus data ini?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        destroy({ eventID }).then(response => {
          this.$message({
            type: 'success',
            message: 'Hapus data berhasil'
          })
          this.getAll()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Hapus data dibatalkan'
        })
      })
    },
    handleSizeChange(val) {
    },
    handleCurrentChange(page) {
      this.getAll(page)
    }
  }
}
</script>
