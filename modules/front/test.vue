<template>
  <div>
    <h1>test</h1>
    <nuxt-link class="nav-link" :to="{ name: 'home' }">
      home
    </nuxt-link>
  </div>
</template>

<script>
export default {
  layout: 'front/layout',
}
</script>
