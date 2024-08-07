<template>
  <div class="row">
    <div class="col-2">
      <CInputGroup>
        <CInputGroupText>
          Limit
        </CInputGroupText>
        <select v-model="meta.take" class="form-select">
          <option v-for="limit in optionsPerPage" :key="limit" :value="limit">{{ limit }}</option>
        </select>
      </CInputGroup>
    </div>
    <div class="col-10 d-flex justify-content-end align-items-end">
      <nav aria-label="Page navigation">
        <ul class="pagination">
          <li class="page-item" :class="{ disabled: page === 1 }">
            <a class="page-link" href="#" @click.prevent="changePage(page - 1)">Previous</a>
          </li>
          <li class="page-item" v-if="page > 2">
            <span class="page-link">...</span>
          </li>
          <li class="page-item" v-for="page in visiblePages" :key="page" :class="page === this.page ? 'bg-danger' : ''">
            <a class="page-link" href="#" @click.prevent="changePage(page)">{{
              page
            }}</a>
          </li>
          <li class="page-item" v-if="page < totalPages - 1">
            <span class="page-link">...</span>
          </li>
          <li class="page-item" v-if="page < totalPages" @click.prevent="changePage(totalPages)">
            <a class="page-link" href="#">{{ totalPages }}</a>
          </li>
          <li class="page-item" :class="{ disabled: page === totalPages }">
            <a class="page-link" href="#" @click.prevent="changePage(page + 1)">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { ACTION_SET_META, GET_META } from '@/store/modules/META.module'
import { mapActions, mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data() {
    return {
      optionsPerPage: [10, 25, 50, 100],
      meta: {
        page: 1,
        take: 10,
        itemCount: 5,
        pageCount: 1,
        hasPreviousPage: false,
        hasNextPage: false,
        timestamp: moment().format('YYYY-MM-DD'),
      },
      page: 1,
    }
  },
  watch: {
    'meta.take': function () {
      this.ACTION_SET_META({ page: 1, take: this.meta.take })
    },
    GET_META: function () {
      this.meta = { ...this.GET_META }
    },
    page: function () {
      this.changePage(this.page)
    }
  },
  computed: {
    ...mapGetters([GET_META]),
    totalPages() {
      return Math.ceil(this.meta.itemCount / this.meta.take)
    },
    visiblePages() {
      const maxVisiblePages = 5
      const pages = []
      let startPage = Math.max(
        this.page - Math.floor(maxVisiblePages / 2),
        1,
      )
      let endPage = startPage + maxVisiblePages - 1

      if (endPage > this.totalPages) {
        endPage = this.totalPages
        startPage = Math.max(endPage - maxVisiblePages + 1, 1)
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i)
      }
      return pages
    },
  },
  methods: {
    ...mapActions([ACTION_SET_META]),
    changePage(page) {
      this.page = page
      this.meta.page = page
      if (page >= 1 && page <= this.totalPages) {
        // this.$emit('page-changed', page)
        this.ACTION_SET_META({ page: page, take: this.meta.take })
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
