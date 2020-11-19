// import axios from 'axios'

const state = () => ({
  currentLocale: 'en',
  locales: ['en', 'en']
})
const mutations = {
  setCurrentLocale (state, payload) {
    this.$i18n.locale = payload
    state.currentLocale = payload
  },
  setLocales (state, payload) {
    state.locales = payload
  }
}
const actions = {
  // nuxtServerInit ({ app }, { store }) {
  //   console.log('nuxt server init!', app)
  //   app.i18n.defaultLocale = store.state.localization.currentLocale
  // },
  changeLocale (context, payload) {
    context.commit('setCurrentLocale', payload)
  },
  getLocales ({ commit }) {
    // axios.get('api/locales')
    //   .then((res) => {
    //     commit('setLocales', res)
    //   })
    //   .catch()
  }
}
const getters = {
  currentLocale (state) {
    return state.currentLocale
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions
}
