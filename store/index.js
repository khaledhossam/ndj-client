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
  }
}
