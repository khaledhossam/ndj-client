<template>
  <div class="container">
    <div>
      <Logo />
      <h1 class="title">
        ndj-nuxt
      </h1>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          rel="noopener noreferrer"
          class="button--green"
        >
          Documentation
        </a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          rel="noopener noreferrer"
          class="button--grey"
        >
          GitHub
        </a>
        <nuxt-link :to="{ name: 'posts' }" class="button--green">
          categories
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  mounted () {
    const host = window.location.host
    const baseDomain = host.substring(host.indexOf('.'))
    const subDomain = host.split('.')[0]

    let apiSubdomain = ''

    switch (subDomain) {
      case 'shop1-nuxt':
        apiSubdomain = 'shop1'
        break
      case 'shop2-nuxt':
        apiSubdomain = 'shop2'
        break
      default:
        apiSubdomain = 'shop1'
    }
    this.$axios.setBaseURL(`http://${apiSubdomain}${baseDomain}/api/v1/`)
  }
}

</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family:
    'Quicksand',
    'Source Sans Pro',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
