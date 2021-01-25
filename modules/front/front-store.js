function initialState () {
  return {
    categories: [],
    brands: [],
    firstCategory: null,
    secondCategory: null,
    thirdCategory: null,
    carts: []
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
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
