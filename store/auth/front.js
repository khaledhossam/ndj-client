// import axios from 'axios'
function initialState () {
  return {
    authUser: {},
    isAuthenticated: false,
    accessToken: null,
    refreshtoken: null
  }
}
const state = initialState
const mutations = {
  setAccessToken (state, payload) {
    state.accessToken = `Bearer ${payload}`
  },

  setRefreshToken (state, payload) {
    state.refreshToken = `Bearer ${payload}`
  },

  setAuthUser (state, payload) {
    state.authUser = payload
    state.isAuthenticated = true
  },

  clearAuthData (state, payload) {
    localStorage.removeItem('authUser')
    localStorage.removeItem('accessToken')
    localStorage.removeItem('refreshToken')
    localStorage.removeItem('isAuthenticated')
  },

  reset (state) {
    const states = initialState()
    Object.keys(states).forEach((key) => {
      state[key] = states[key]
    })
  }
}
const actions = {
  changeAccessToken (context, payload) {
    context.commit('setAccessToken', payload)
  },

  changeRefreshToken (context, payload) {
    context.commit('setRefreshToken', payload)
  },

  changeAuthUser (context, payload) {
    context.commit('setAuthUser', payload)
  }
}
const getters = {
  authUser: (state) => {
    return state.authUser
  },
  accessToken: (state) => {
    return state.accessToken
  },
  refreshToken: (state) => {
    return state.refreshToken
  },
  isAuthenticated: (state) => {
    return state.isAuthenticated
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
