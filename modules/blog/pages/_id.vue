<template>
  <div class="text-center">
    <h1>route params: {{ $route.params.id }}</h1>
    <h4>subcategories</h4>
    <div v-if="$store.state.selectedPost.length" class="row" style="margin:auto;width:17%">
      <div v-for="cat in $store.state.selectedPost" :key="cat.id">
        <div class="text-center">
          <h4 style="border:1px solid #ccc;padding:5px;margin:5px">
            {{ cat.name }}
          </h4>
        </div>
      </div>
    </div>
    <div v-else class="row" style="margin:auto;width:17%">
      <span class="text-danger text-center">there is no subcategories...</span>
    </div>
    <nuxt-link :to="{ name: 'categories' }" class="btn btn-success mb-4">
      back
    </nuxt-link>
  </div>
</template>

<script>
export default {
  validate ({ params, query, store }) {
    return !isNaN(params.id)
  },
  props: {
    post: {
      type: Object,
      default: null,
      required: false
    }
  },
  fetch ({ $axios, store, params }) {
    // if (store.state.selectedPost && store.state.selectedPost.id === params.id) {
    //   return true
    // }
    return $axios.$get(`list-sub-categories?category_id=${params.id}`)
      .then((res) => {
        store.commit('selectedPost', res.data)
      })
  },
  data () {
    return {
      // post: params.post
    }
  }
}
</script>
