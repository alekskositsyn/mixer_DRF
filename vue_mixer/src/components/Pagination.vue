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
      <li class="page-item">
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
import {mapState, mapActions} from 'vuex'

export default {
  name: "Pagination",

  props: {
    maxVisibleButtons: {
      type: Number,
      required: false,
      default: 3
    },
    totalPages: {
      type: Number,
      required: true
    },
    perPage: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },

  computed: {
    startPage() {
      // When on the first page
      if (this.currentPage === 1) {
        return 1;
      }

      // When on the last page
      if (this.currentPage === this.totalPages) {
        return this.totalPages - this.maxVisibleButtons;
      }

      // When inbetween
      return this.currentPage - 1;
    },
    pages() {
      const range = [];

      for (
          let i = this.startPage;
          i <= Math.min(this.startPage + this.maxVisibleButtons - 1, this.totalPages);
          i++
      ) {
        range.push({
          name: i,
          isDisabled: i === this.currentPage
        });
      }

      return range;
    },
    isInFirstPage() {
      // console.log(this.currentPage === 1)
      return this.currentPage === 1;
    },
    isInLastPage() {
      // console.log(this.currentPage === this.totalPages)
      return this.currentPage === this.totalPages;
    },
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