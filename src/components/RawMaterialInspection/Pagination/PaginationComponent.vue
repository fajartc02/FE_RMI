<template>
  <div class="row">
    <div class="col-2">
      <CInputGroup>
        <CInputGroupText>
          Limit
        </CInputGroupText>
        <select class="form-select" v-model="filter.rowPerPage">
          <option v-for="limit in optionsPerPage" :key="limit" :value="limit">{{ limit }}</option>
        </select>
      </CInputGroup>
    </div>
    <div class="col-10 d-flex justify-content-end align-items-end">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage - 1)">Previous</a>
          </li>
          <li class="page-item" v-if="currentPage > 2">
            <span class="page-link">...</span>
          </li>
          <li class="page-item" v-for="page in visiblePages" :key="page" :class="{ active: currentPage === page }">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{
              page
            }}</a>
          </li>
          <li class="page-item" v-if="currentPage < totalPages - 1">
            <span class="page-link">...</span>
          </li>
          <li class="page-item" v-if="currentPage < totalPages" @click.prevent="changePage(totalPages)">
            <a class="page-link" href="#">{{ totalPages }}</a>
          </li>
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(currentPage + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        rowPerPage: 10,
      },
      optionsPerPage: [10, 25, 50, 100],
    }
  },
  props: {
    totalData: {
      type: Number,
      required: true,
      default: 1,
    },
    currentPage: {
      type: Number,
      required: true,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      required: true,
      default: 10,
    },
  },
  computed: {
    totalPages() {
      return Math.ceil(this.totalData / this.itemsPerPage)
    },
    visiblePages() {
      const maxVisiblePages = 5
      const pages = []
      let startPage = Math.max(
        this.currentPage - Math.floor(maxVisiblePages / 2),
        1,
      )
      let endPage = startPage + maxVisiblePages - 1

      if (endPage > this.totalPages) {
        endPage = this.totalPages
        startPage = Math.max(endPage - maxVisiblePages + 1, 1)
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
        // console.log(i);
      }
      return pages
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.$emit('page-changed', page)
      }
    },
  },
}
</script>

<style scoped>
.page-item.disabled .page-link {
  pointer-events: none;
  cursor: not-allowed;
}

.page-item.active .page-link {
  background-color: #007bff;
  border-color: #007bff;
  color: white;
}
</style>
