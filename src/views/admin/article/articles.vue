<template>
  <div class="app-container calendar-list-container">
      <div class="filter-container">
      <el-input style="width: 200px;" class="filter-item" placeholder="Judul" v-model="search.title">
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
      <el-table-column label="Judul" >
        <template slot-scope="scope">
          <router-link v-if="scope.row.article_type === 'news'" :to="{ name: 'article-detail-route', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.slug,  'articleID': scope.row.id} }">                  
            <span v-html="scope.row.title">  </span>
          </router-link>
          <router-link   v-if="scope.row.article_type === 'image'" :to="{ name: 'editorial-image-detail', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.slug } }" >                      
            <span v-html="scope.row.title">  </span>
          </router-link>
          <router-link v-if="scope.row.article_type === 'video'" :to="{ name: 'editorial-video-detail', params: { 'editorialSlug':scope.row.editorial.slug, 'slug': scope.row.slug} }">
            <span v-html="scope.row.title">  </span>
          </router-link>
        </template>
      </el-table-column>
      <el-table-column label="Reporter"   width="150" >
        <template slot-scope="scope">
          {{scope.row.reporter_name}}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.published | statusFilter"> {{getPublishedStatus(scope.row.published)}}</el-tag>
          <el-tag v-if="scope.row.is_topslide" size="mini" type=""> Berita Utama</el-tag>
          <el-tag v-if="scope.row.is_headline" size="mini" type=""> Headline</el-tag>
          <el-tag v-if="scope.row.is_editor_pick" size="mini" type=""> Pilihan Editor</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="publish_date" label="Tanggal Publish" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span>{{scope.row.publish_date | formatDate }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column align="center" label="Status" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.published" @change="updatePublished(scope.row.id,scope.row.published)" active-text="Publish" inactive-text="Draft" active-color="#13ce66" inactive-color="#ff4949" ></el-switch>
        </template>
      </el-table-column> -->
      <el-table-column align="center" label="Actions" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <router-link class="filter-item" :to="{ name: 'admin-article-form', params: { editorialSlug, articleType, 'articleId': scope.row.id} }" >
            <el-button type="primary" size="mini" >Edit</el-button>
          </router-link>
          
          <el-button type="danger" size="mini" @click="deleteHandler(scope.row.id)">Delete</el-button>
          
          <el-dropdown size="mini" split-button type="info">
            Lainnya
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item v-if="(scope.row.article_type === 'news' || scope.row.article_type === 'image') &&  editorialSlug !== 'infografis' && !scope.row.is_topslide" ><el-button type="text" size="mini"  @click="setAsBeritaUtamaHandler(scope.row.id,scope.row.editorial.id)" >  Set as Berita Utama </el-button> </el-dropdown-item>
              <el-dropdown-item v-if="(scope.row.article_type === 'news' || scope.row.article_type === 'image') &&  editorialSlug !== 'infografis'   && !scope.row.is_headline"> <el-button type="text" size="mini"  @click="setAsHeadlineHandler(scope.row.id,scope.row.editorial.id)" >Set as Headline </el-button></el-dropdown-item>
              <el-dropdown-item v-if="scope.row.editorial && !scope.row.is_editor_pick" ><el-button type="text" size="mini"  @click="setAsPilihanEditorHandler(scope.row.id,scope.row.editorial.id)" >Set as Pilihan Editor</el-button></el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
import { getListByEditorialSlug, searchListByEditorialSlug, updatePublished, softDelete, setAsBeritaUtama, setAsHeadline, setAsPilihanEditor } from '@/api/article'

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
      total_entries_size: 0,
      search: {
        title: null
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
    },
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
      searchListByEditorialSlug({
        title: this.search.title,
        editorialSlug: this.editorialSlug,
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
    updatePublished(article_id, published) {
      updatePublished({
        article_id,
        published
      }).then(response => {
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
    setAsBeritaUtamaHandler(article_id, editorial_id) {
      this.$confirm('Anda yakin akan memilih berita ini sebagai Berita Utama?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        setAsBeritaUtama({
          article_id,
          editorial_id
        }).then(response => {
          if (response) {
            this.getArticlesByEditorialSlug(this.editorialSlug, this.page)
          }
        })
        this.$message({
          type: 'success',
          message: 'Data Berhasil Di Update'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Batalkan'
        })
      })
    },
    setAsHeadlineHandler(article_id, editorial_id) {
      this.$confirm('Anda yakin akan memilih berita ini sebagai Headline?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        setAsHeadline({
          article_id,
          editorial_id
        }).then(response => {
          if (response) {
            this.getArticlesByEditorialSlug(this.editorialSlug, this.page)
          }
        })
        this.$message({
          type: 'success',
          message: 'Data Berhasil Di Update'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: 'Batalkan'
        })
      })
    },
    setAsPilihanEditorHandler(article_id, editorial_id) {
      this.$confirm('Anda yakin akan memilih berita ini sebagai Plihan Editor?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        setAsPilihanEditor({
          article_id,
          editorial_id
        }).then(response => {
          if (response) {
            this.getArticlesByEditorialSlug(this.editorialSlug, this.page)
          }
        })
        this.$message({
          type: 'success',
          message: 'Data Berhasil Di Update'
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