<template>
  <div>
      <div> <h1> Test {{ editorialSlug }} </h1> </div>
    
  
  
</div>
</template>

<script>
import { getAll } from '@/api/article'

export default {
  name: 'articles',
  props: {
    editorialSlug: {
      type: String
    }
  },
  data() {
    return {
      articles: [],
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
    this.fetchData()
    console.log(this)
  },
  methods: {
    fetchData() {
      this.listLoading = true
      // getListByEditorialSlug({'editorialSlug': this.editorialSlug}).then(response => {
      //   this.articles = response.data.items
      //   this.listLoading = false
      // })
      getAll({}).then(response => {
        console.log(response)
      })
    },
    formatter(row, column) {
      return row.teaser
    },
    filterTag(value, row) {
      return null
    },
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      console.log(index, row)
    }
  }
}
</script>