<template>
  <Nuxt />
</template>

<script>
export default {
  Name: 'admin-layout',
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: require('~/assets/admin/scss/main.scss') }
      ]
    }
  }
}
</script>
