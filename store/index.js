export default {
  state: () => ({
    posts: [],
    selectedPost: {}
  }),
  mutations: {
    updatePosts (state, posts) {
      state.posts = posts
    },
    selectedPost (state, post) {
      state.selectedPost = post
    }
  },
  actions: {
    nuxtServerInit ({ commit }, { req }) {
      // console.log('nuxt server init!', req.headers.host, process.env._AXIOS_BASE_URL_)
    }
  }
}
