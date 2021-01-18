<template>
  <Nuxt />
</template>

<script>
export default {
  Name: 'front-layout',
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: require('~/assets/front/css/slick.css') },
        { rel: 'stylesheet', href: require('~/assets/front/css/style.css') }
      ]
    }
  },
}
</script>
