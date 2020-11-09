<template>
  <div>
    <h1 class="text-center">
      posts
      <nuxt-link :to="{ name: 'home' }" class="btn btn-success">
        back
      </nuxt-link>
    </h1>
    <hr>
    <div class="row container-fluid">
      <div v-for="post in $store.state.posts" :key="post.id" class="col-lg-3 post-grid">
        <nuxt-link :to="{ name: 'category', params: { id: post.id, post: post }}">
          <span @click="updateSelectedPost(post)">
            {{ post.name }}
          </span>
        </nuxt-link>
      </div>
    </div>
    <app-modal button-label="delete" :button-text-style="true" button-color="error">
      <template slot-scope="{close}">
        <v-card>
          <v-card-title class="headline">
            delete item?
          </v-card-title>
          <!-- <v-card-text>Let Google help apps determine location. This means sending anonymous location data to Google, even when no apps are running.</v-card-text> -->
          <v-card-actions>
            <v-spacer />
            <v-btn
              color="error"
              text
              :loading="loading"
              @click="deletePost()"
            >
              delete
            </v-btn>
            <v-btn
              color="green darken-1"
              text
              :disabled="loading"
              @click="close"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </template>
    </app-modal>
  </div>
</template>
<script>
import AppModal from '@/components/shared/app-modal'
// import axios from 'axios'
export default {
  components: {
    AppModal
  },
  // asyncData ({ isDev, route, store, env, params, query, req, res, redirect, error })
  // asyncData ({ $axios }) {
  //   return $axios.$get('http://jsonplaceholder.typicode.com/posts')
  //     .then((res) => {
  //       return {
  //         posts: res
  //       }
  //     })
  // },
  fetch ({ $axios, store, req, beforeNuxtRender }) {
    return $axios.$get('list-categories')
      .then((res) => {
        store.commit('updatePosts', res.data)
      })
  },
  data () {
    return {
      // posts: this.store.state.posts,
      loading: false
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
    },
    deletePost (post) {
      this.loading = true
      // this.$axios.$delete(`/posts/${post.id}`).finally(() => {
      //   this.loading = false
      // })
    }
  }
}
</script>
<style scoped>
.post-grid{
  border: 1px solid #ccc;
  margin: 5px;
  padding: 5px;
  text-align: center;
}
</style>
