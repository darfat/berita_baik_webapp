<template>
  <div class="app-container calendar-list-container">
      <div class="filter-container" v-if="role==='public'">
      <router-link class="filter-item" :to="{ name: 'back-public-article-form', params: { editorialSlug, articleType } }" >
        <el-button type="primary" >Tulis Berita Baik</el-button>
      </router-link>    
      </div>
    
      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row style="width: 100%"> 
      <el-table-column  align="right"
        type="index"
        width="50" :index="indexMethod">
      </el-table-column>
      <el-table-column label="Judul" >
        <template slot-scope="scope">
          <router-link v-if="scope.row.article_type === 'y-news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.slug,  'articleID': scope.row.id} }">                  
            <span v-html="scope.row.title">  </span>
          </router-link>
          <router-link   v-if="scope.row.article_type === 'y-image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.slug } }" >                      
            <span v-html="scope.row.title">  </span>
          </router-link>         
        </template>
      </el-table-column>
      <el-table-column label="Penulis"   width="150" >
        <template slot-scope="scope">
          {{scope.row.reporter_name}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="180" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.published | statusFilter"> {{getPublishedStatus(scope.row.published,scope.row.status)}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="publish_date" label="Tanggal Publish" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.publish_date | formatDate }}</span>
        </template>
      </el-table-column>
      
      <el-table-column align="center" label="Actions" width="150" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link class="filter-item" :to="{ name: 'back-public-article-form', params: { editorialSlug, articleType, 'articleId': scope.row.id} }" >
            <el-button type="primary" size="mini" >Edit</el-button>
          </router-link>
          
          <el-button type="danger" size="mini" @click="deleteHandler(scope.row.id)">Delete</el-button>
          
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
import { getMyListByEditorialSlug, softDelete } from '@/api/article'
import { mapGetters } from 'vuex'

export default {
  name: 'myArticles',
  props: {
    editorialSlug: { type: String },
    articleType: { type: String }
  },
  computed: {
    ...mapGetters([
      'name',
      'role',
      'email',
      'username',
      'user_id'
    ])
  },
  data() {
    return {
      list: null,
      listLoading: true,
      per_page: 10,
      page: 1,
      total_pages: 1,
      total_entries_size: 0,
      search: {
        title: ''
      }
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
      getMyListByEditorialSlug({
        editorialSlug,
        userID: this.user_id,
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
    getPublishedStatus(isPublished, status) {
      if (isPublished === true) {
        return 'Published'
      } else {
        return status
      }
    },
    handleSizeChange(val) {},
    handleCurrentChange(page) {
      this.getArticlesByEditorialSlug(this.editorialSlug, page)
    },
    handleUpdate(row) {
      // const data = Object.assign({}, row) // copy obj
      // console.log(data)
    },
    handleFilter() {
      // const data = Object.assign({}, row) // copy obj
      this.listLoading = true
      let title = this.search.title
      if (this.search && this.search.title) {
        title = this.search.title.toLowerCase()
      }
      getMyListByEditorialSlug({
        title,
        editorialSlug: this.editorialSlug,
        userID: this.user_id,
        page: 1,
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
    deleteHandler(article_id) {
      this.$confirm('Anda yakin akan menghapus data ini?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        softDelete({
          article_id
        }).then(response => {
          if (response) {
            this.getArticlesByEditorialSlug(this.editorialSlug, this.page)
          }
        })
        this.$message({
          type: 'success',
          message: 'Data Berhasil Dihapus'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Batalkan'
        })
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