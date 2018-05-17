<template>
  <div class="app-container">
    <div class="filter-container">
       
    </div>
    <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label='No' width="95">
        <template slot-scope="scope">
          {{scope.$index + 1}}
        </template>
      </el-table-column>
      <el-table-column label="Laporan" >
        <template slot-scope="scope">
          <span>{{scope.row.response}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Artikel" >
        <template slot-scope="scope">
          <span v-if="scope.row.article.active">
            <router-link v-if="scope.row.article.article_type === 'news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.article.slug,  'articleID': scope.row.article.id} }">                  
              <span v-html="scope.row.article.title">  </span>
            </router-link>
            <router-link   v-if="scope.row.article.article_type === 'image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.article.slug } }" >                      
              <span v-html="scope.row.article.title">  </span>
            </router-link>
            <router-link v-if="scope.row.article.article_type === 'video'" :to="{ name: 'editorial-video-detail', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.article.slug} }">
              <span v-html="scope.row.article.title">  </span>
            </router-link>
          </span>
          <span v-else>{{scope.row.article.title}}</span>
        </template>
      </el-table-column>
      <el-table-column label="Editorial" >
        <template slot-scope="scope">
          <span>{{scope.row.editorial.name}}</span>
        </template> 
      </el-table-column>  
      <el-table-column class-name="status-col" label="Status" width="150" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.article.active | statusFilter"> {{getPublishedStatus(scope.row.article.active)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="Dilapor Oleh" >
        <template slot-scope="scope">
          <span>{{scope.row.user.name}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions Article" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link class="filter-item" :to="{ name: 'admin-article-form', params: { 'editorialSlug' : scope.row.editorial.slug, 'articleType': scope.row.article.article_type, 'articleId': scope.row.article.id} }" >
            <el-button type="primary" size="mini" >Edit</el-button>
          </router-link>
          <el-button type="danger" size="mini" @click="deleteArticleRow(scope.row.article.id)" >Delete</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" label="Actions" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
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
import { getAll, destroy } from '@/api/reported_article'
import { softDelete } from '@/api/article'

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
    deleteArticleRow(article_id) {
      this.$confirm('Apakah anda yakin akan menghapus artikel ini?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        softDelete({ article_id }).then(response => {
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
    deleteRow(id) {
      this.$confirm('Apakah anda yakin akan menghapus data ini?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        destroy({ id }).then(response => {
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
    },
    getPublishedStatus(isActive) {
      if (isActive === true) {
        return 'Published'
      } else {
        return 'Konten Dihapus'
      }
    }
  }
}
</script>
