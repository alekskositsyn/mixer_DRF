<template>
  <nav aria-label="...">
    <ul class="pagination justify-content-center">
      <li class="page-item ">
        <button
            :disabled="isInFirstPage" class="page-link link-danger"
            href="#"
            type="button"
            @click="onClickFirstPage"
        >
          Первая
        </button>
      </li>
      <li class="page-item"
      >
        <button
            class="page-link link-danger"
            type="button"
            @click="onClickPreviousPage"
            :disabled="isInFirstPage"

        >Предыдущая
        </button>
      </li>
      <!-- Visible Buttons Start -->
      <li class="page-item"
          v-for="page in pages"
          :key="page.name"
      >
        <button class="page-link link-danger"
                :class="{active: currentPage === page.name}" href="#"
                type="button"
                @click="onClickPage(page.name)"
                :disabled="page.isDisabled"
        >
          {{ page.name }}
        </button>
      </li>
      <li class="page-item">
        <button class="page-link link-danger" href="#"
                type="button"
                @click="onClickNextPage"
                :disabled="isInLastPage"
        >Следующая
        </button>
      </li>
      <li class="page-item">
        <button class="page-link link-danger" href="#"
                type="button"
                @click="onClickLastPage"
                :disabled="isInLastPage"
        >Последняя
        </button>
      </li>
    </ul>
  </nav>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'

export default {
  name: "Pagination",

  computed: {
    ...mapGetters('pagination', [
      'isInFirstPage',
      // 'startPage',
      'pages',
      'isInLastPage'
    ]),
    ...mapState('pagination', [
      'maxVisibleButtons',
      'totalPages',
      'perPage',
      'currentPage',
      'total',
      // 'startPage'
    ])
  },

  methods: {
    onClickFirstPage() {
      this.$emit('pagechanged', 1);
    },
    onClickPreviousPage() {
      this.$emit('pagechanged', this.currentPage - 1);
    },
    onClickPage(page) {
      this.$emit('pagechanged', page);
    },
    onClickNextPage() {
      this.$emit('pagechanged', this.currentPage + 1);
    },
    onClickLastPage() {
      this.$emit('pagechanged', this.totalPages);
    }
  }
}
</script>

<style scoped>
.pagination {
  margin-top: 12px;
}

.page-link.active {
  color: whitesmoke;
  background-color: indianred;
  border-color: indianred;
}
</style>