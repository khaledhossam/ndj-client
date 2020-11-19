// import { Store, mapState } from 'vuex'
import { mapState } from 'vuex'
import locales from './index'

export default {
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  locale: this.currentLocale,
  fallbackLocale: this.currentLocale,
  messages: locales
}
