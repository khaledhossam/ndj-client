import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
// import Vuetify from 'vuetify/lib'

// Vue.use(Vuetify)
Vue.use(VeeValidate)

const state = () => ({
  currentLocale: 'en',
  locales: ['ar', 'en']
})
const mutations = {
  setCurrentLocale (state, payload) {
    this.$i18n.locale = payload
    state.currentLocale = payload
    Validator.localize(payload)
    // process.app.$vuetify.lang.current = payload
    // Vue.prototype.$vuetify.rtl = payload == 'en' ? false : true
    // Vue.use(Vuetify, {
    //   rtl: payload === 'en' ? false : true
    // })
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
