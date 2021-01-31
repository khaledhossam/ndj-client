function initialState () {
  return {
    carts: [],
    categories: [],
    brands: [],
    firstCategory: null,
    secondCategory: null,
    thirdCategory: null,
    selectedCategory: null
  }
}
const state = initialState
const mutations = {
  setCategories (state, payload) {
    state.categories = payload
    //* handle special three categories in home page */
    state.firstCategory = payload[0] || null
    state.secondCategory = payload[1] || null
    state.thirdCategory = payload[2] || null
  },
  setBrands (state, payload) {
    state.brands = payload
  },
  setCarts (state, payload) {
    state.carts = payload
  },
  setSelectedCategory (state, payload) {
    state.selectedCategory = payload
  },

  clearFrontData (state, payload) {
    localStorage.removeItem('categories')
  },

  reset (state) {
    const states = initialState()
    Object.keys(states).forEach((key) => {
      state[key] = states[key]
    })
  }
}
const actions = {
  changeCategories (context, payload) {
    context.commit('setCategories', payload)
  },
  changeBrands (context, payload) {
    context.commit('setBrands', payload)
  },
  changeCarts (context, payload) {
    context.commit('setCarts', payload)
  },
  changeSelectedCategory (context, payload) {
    context.commit('setSelectedCategory', payload)
  }
}
const getters = {
  categories: (state) => {
    return state.categories
  },
  brands: (state) => {
    return state.brands
  },
  carts: (state) => {
    return state.carts
  },
  firstCategory: (state) => {
    return state.firstCategory
  },
  secondCategory: (state) => {
    return state.secondCategory
  },
  thirdCategory: (state) => {
    return state.thirdCategory
  },
  changeSelectedCategory: (state) => {
    return state.selectedCategory
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
