
// import Vue from 'vue'
// import Vuex from 'vuex'

// import admin from './admin'
// import localization from './localization'

export const state = () => ({})
export const mutations = {}
export const actions = {}
export const getters = {}

// Vue.use(Vuex)

// export const store = new Vuex.Store({

//   state: () => ({
//     currentLocale: '',
//     locales: ['ar', 'en']
//   }),
//   mutations: {},
//   actions: {},
//   getters: {},
//   modules: {
//     admin,
//     localization
//   },
//   strict: false
// })

// export default {
//   state: () => ({
//     posts: [],
//     selectedPost: {},
//     /* User */
//     userName: null,
//     userEmail: null,
//     userAvatar: null,

//     /* NavBar */
//     isNavBarVisible: true,

//     /* FooterBar */
//     isFooterBarVisible: true,

//     /* Aside */
//     isAsideVisible: true,
//     isAsideMobileExpanded: false
//   }),
//   mutations: {
//     updatePosts (state, posts) {
//       state.posts = posts
//     },
//     selectedPost (state, post) {
//       state.selectedPost = post
//     },
//     /* A fit-them-all commit */
//     basic (state, payload) {
//       state[payload.key] = payload.value
//     },

//     /* User */
//     user (state, payload) {
//       if (payload.name) {
//         state.userName = payload.name
//       }
//       if (payload.email) {
//         state.userEmail = payload.email
//       }
//       if (payload.avatar) {
//         state.userAvatar = payload.avatar
//       }
//     },

//     /* Aside Mobile */
//     asideMobileStateToggle (state, payload = null) {
//       const htmlClassName = 'has-aside-mobile-expanded'

//       let isShow

//       if (payload !== null) {
//         isShow = payload
//       } else {
//         isShow = !state.isAsideMobileExpanded
//       }

//       if (isShow) {
//         document.documentElement.classList.add(htmlClassName)
//       } else {
//         document.documentElement.classList.remove(htmlClassName)
//       }

//       state.isAsideMobileExpanded = isShow
//     }
//   },

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
