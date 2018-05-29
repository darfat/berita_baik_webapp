<template>
  <div class="app-container">
    <div class="filter-container m-b-20">
      <el-row :gutter="20">
        <el-col :span="6">
            <el-date-picker type="date" placeholder="Pilih Tanggal" v-model="search.date" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col :span="4">
            <el-select v-model="search.position" placeholder="Pilih Posisi">
              <el-option  v-for="item in ads_opts" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleFilter()">Search</el-button>
          &nbsp;
          <el-button type="info" @click="handleClear()">Clear</el-button>

        </el-col>
       
      </el-row>
      <div class="m-t-20">
      <router-link class="filter-item" :to="{ name: 'advertisement-form' }" >
        <el-button type="primary" >Create</el-button>
      </router-link>   
      </div> 
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='#Order' width="95">
        <template slot-scope="scope">
          {{scope.row.order_no}}
        </template>
      </el-table-column>
      <el-table-column label="Klien" width="150">
        <template slot-scope="scope">
          {{scope.row.client_name}}
        </template>
      </el-table-column>
      <el-table-column label="Iklan" width="150">
        <template slot-scope="scope">
          {{scope.row.title}}
        </template>
      </el-table-column>
      <el-table-column label="Posisi" >
        <template slot-scope="scope">
          <span>{{scope.row.position}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="date" label="Date" width="210">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.start_date | formatDateOnly}} - {{scope.row.end_date | formatDateOnly}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Created By" >
        <template slot-scope="scope">
          <span v-if="scope.row.user">{{scope.row.user.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link class="filter-item" :to="{ name: 'advertisement-form', params: { 'advertisementId': scope.row.id} }" >
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
import { getAll, destroy } from '@/api/advertisement'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      per_page: 15,
      page: 1,
      total_pages: 1,
      total_entries_size: 0,
      search: {
        date: null,
        position: null
      },
      ads_opts: [
        {
          value: 'Home : Atas',
          label: 'Home : Atas',
          type: '1'
        },
        {
          value: 'Home : Tengah',
          label: 'Home : Tengah',
          type: '1'
        },
        {
          value: 'Home : Kanan',
          label: 'Home : Kanan',
          type: '3'
        },
        {
          value: 'Home : Galeri',
          label: 'Home : Galeri',
          type: '4'
        },
        {
          value: 'Artikel : Atas',
          label: 'Artikel : Atas',
          type: '1'
        },
        {
          value: 'Artikel : Tengah',
          label: 'Artikel : Tengah',
          type: '2'
        },
        {
          value: 'Artikel : Kanan',
          label: 'Artikel : Kanan',
          type: '3'
        },
        {
          value: 'Kanal : Atas',
          label: 'Kanal : Atas',
          type: '1'
        },
        {
          value: 'Kanal : Kanan',
          label: 'Kanal : Kanan',
          type: '3'
        },
        {
          value: 'Video : Headline',
          label: 'Video : Headline',
          type: '3'
        }
      ]
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
      // eslint-disable-next-line
      let params = {
        page: page,
        per_page: this.per_page
      }
      if (this.search.date !== null) {
        params.date = this.search.date
      }
      if (this.search.position !== null) {
        params.position = this.search.position
      }
      console.log(params)
      getAll(params).then(response => {
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
    deleteRow(advertisementID) {
      this.$confirm('Apakah anda yakin akan menghapus data ini?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        destroy({ advertisementID }).then(response => {
          this.$message({
            type: 'success',
            message: 'Hapus data berhasil'
          })
          this.getAll(1)
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
    },
    handleFilter() {
      this.getAll(1)
    },
    handleClear() {
      this.search.date = null
      this.search.position = null
    }
  }
}
</script>
