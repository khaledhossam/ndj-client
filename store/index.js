
// import Vue from 'vue'
// import Vuex from 'vuex'

import frontStore from '@/modules/front/front-store'

export const state = () => ({})
export const mutations = {}
export const actions = {
  clearAllAdmin ({ commit }) {
    commit('auth/admin/reset')
  },
  clearAllFront ({ commit }) {
    commit('auth/front/reset')
  }
}
export const getters = {}

export const modules = {
  frontStore
}

// Vue.use(Vuex)

// export const store = new Vuex.Store({

//   state: () => ({
//     currentLocale: 'ar',
//     locales: ['ar', 'en']
//   }),
//   mutations: {},
//   actions: {
//     clearAllAdmin ({ commit }) {
//       commit('auth/admin/reset')
//     },
//     clearAllFront ({ commit }) {
//       commit('auth/front/reset')
//     }
//   },
//   getters: {},
//   modules: {
//     admin,
//     localization,
//     frontStore
//   },
//   strict: false
// })

//   actions: {
//     nuxtServerInit ({ commit }, { req }) {
//       // console.log('nuxt server init!', req.headers.host, process.env._AXIOS_BASE_URL_)
//     },
//     nuxtServerInit ({ state, commit, dispatch }, { route, app }) {
//       // console.log('nuxt server init!', app)
//       console.log('init server locale>>>', app.i18n.defaultLocale, state.localization)
//       app.i18n.defaultLocale = state.localization.currentLocale
//       console.log('init server locale>>>', app.i18n.defaultLocale, state.localization)
//     }
//   }
// }
