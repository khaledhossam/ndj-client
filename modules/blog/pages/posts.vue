<template>
  <div>
    <h1 class="text-center">
      posts
      <nuxt-link :to="{ name: 'home' }" class="btn btn-success">
        back
      </nuxt-link>
    </h1>

    <hr>
    <div class="row container">
      <div v-for="post in $store.state.posts" :key="post.id" class="col-lg-3 post-grid">
        <div class="text-center">
          <h4>
            <nuxt-link :to="{ name: 'post', params: { id: post.id, post: post }}">
              <span @click="updateSelectedPost(post)">
                {{ post.name }}
              </span>
            </nuxt-link>
          </h4>
          <!-- <span>{{ post.body }}</span> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import axios from 'axios'
export default {
  // asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error })
  // asyncData ({ $axios }) {
  //   return $axios.$get('http://jsonplaceholder.typicode.com/posts')
  //     .then((res) => {
  //       return {
  //         posts: res
  //       }
  //     })
  // },
  fetch ({ $axios, store }) {
    return $axios.$get('list-categories')
      .then((res) => {
        store.commit('updatePosts', res.data)
      })
  },
  data () {
    return {
      // posts: this.store.state.posts
    }
  },
  mounted () {
    // this.loadPosts()
    // console.log('base url:', process.env.BROWSER_BASE_URL)
  },
  methods: {
    loadPosts () {
      //* * call axios from module nuxt */
      this.$axios.$get('/list-categories')
        .then((res) => {
          this.posts = res
        })
    },
    updateSelectedPost (post) {
      this.$store.commit('selectedPost', post)
    }
  }
}
</script>
<style scoped>
.post-grid{
  border: 1px solid #ccc;
  margin: 10px;
  padding: 10px;
}
</style>
