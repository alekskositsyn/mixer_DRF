const state = () => ({
    maxVisibleButtons: 3,
    totalPages: 0,
    perPage: 10,
    currentPage: 1,
    total: 0,
    startPage: 1
})

const getters = {
    startPage: (state) => {
        // When on the first page
        if (state.currentPage === 1) {
            return 1;
        }
        // When on the last page
        if (state.currentPage === state.totalPages) {
            return state.totalPages - state.maxVisibleButtons;
        }
        // When inbetween
        return state.currentPage - 1;
    },
    pages: (state, getters) => {
        const range = [];
        for (
            let i = getters.startPage;
            i <= Math.min(getters.startPage + state.maxVisibleButtons - 1, state.totalPages);
            i++
        ) {
            range.push({
                name: i,
                isDisabled: i === state.currentPage
            });
        }
        return range;
    },
    isInFirstPage: (state) => {
        // console.log(this.currentPage === 1)
        return state.currentPage === 1;
    },
    isInLastPage: (state) => {
        // console.log(this.currentPage === this.totalPages)
        return state.currentPage === state.totalPages;
    }
}

const actions = {}

const mutations = {
    setTotalCountProducts(state, products) {
        state.total = products.count
    },
    setTotalPagesCountProducts(state, products) {
        const items = products.results.length
        state.totalPages = Math.ceil(state.total / items)
    },
    setStartPage(state, page) {
        state.startPage = page - 1
    },
    setCurrentPage(state, page) {
        state.currentPage = page
    }

}


export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}