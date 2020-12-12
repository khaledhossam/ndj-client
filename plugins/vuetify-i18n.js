import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import { en, ar } from 'vuetify/lib/locale'

Vue.use(Vuetify)

export default ({ app, store }) => {
  app.$vuetify.lang.locales = [en, ar]
  app.$vuetify.lang.current = store.state.localization.currentLocale
}
// export default new Vuetify({
//   lang: {
//     locales: { en, ar },
//     current: 'en',
//   },
// })
