<template>
  <div class="text-center">
    <h1>route params: {{ $route.params.id }}</h1>
    <div class="text-center" style="width: 20%;margin:auto">
      <h4>{{ post.title }}</h4>
      <span>{{ post.body }}</span>
    </div>
    <nuxt-link :to="{ name: 'posts' }" class="btn btn-success mb-4">
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
      required: true
    }
  },
  data () {
    return {
      // post: params.post
    }
  }
}
</script>
