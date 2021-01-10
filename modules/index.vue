<template>
  <div class="container">
    <div>
      <Logo />
      <h2>
        {{ $t('website.welcomeMessage', ['Preetish HS', 'contact@preetish.in']) }}
      </h2>
      <div class="lang-dropdown text-muted">
        <select
          v-model="$store.state.localization.currentLocale"
          style="border: 2px solid #bbb"
          @change="onLangChange($event.target.value)"
        >
          <option
            v-for="lang in $i18n.locales"
            :key="lang.code"
            :value="lang.code"
          >
            {{ lang.name }}
          <!-- <nuxt-link
            :to="switchLocalePath('en')"
          >
            english
          </nuxt-link>
          <nuxt-link
            :to="switchLocalePath('ar')"
          >
            arabic
          </nuxt-link> -->
          </option>
        </select>
      </div>
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
<!--        <nuxt-link :to="{ name: 'posts' }" class="button&#45;&#45;green">-->
<!--          categories-->
<!--        </nuxt-link>-->
      </div>
    </div>
    <meta-tag :title="title" />
  </div>
</template>

<script>
import MetaTag from '@/components/head-meta-tags'
import { mapState } from 'vuex'

export default {
  components: {
    MetaTag
  },
  data () {
    return {
      title: 'home page'
      // currentLocale: ''
    }
  },
  computed: {
    ...mapState({
      // currentLocale: state => state.localization.currentLocale
      currentLocale: 'localization.currentLocale'
    })
  },
  created () {},
  methods: {
    onLangChange (event) {
      // this.$i18n.locale = event
      this.$store.commit('localization/setCurrentLocale', event)

      this.$buefy.snackbar.open({
        message: `changed successfully to ${event}`,
        queue: false
      })
      this.$forceUpdate()
      // window.location.reload(`/${event}/${this.$router.currentRoute.path}`)
      // this.$router.replace({ path: `/${event}/${this.$router.currentRoute.path}` })
    }
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
  font-size: 40px;
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
