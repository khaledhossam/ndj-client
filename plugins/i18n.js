// import locales from '@/locales/index'
// import Vue from 'vue'
// import VueI18n from 'nuxt-i18n'
import { localize } from 'vee-validate'

export default ({ app, store }) => {
  const currentLocale = store.state.localization.currentLocale
  app.i18n.defaultLocale = app.i18n.locale = app.i18n.fallbackLocale = currentLocale
  // localeChanged() // notify vee-validate of localization changes
  // Activate the Arabic locale.
  localize(currentLocale)
  // app.i18n = new VueI18n({
  //   locale: store.state.localization.currentLocale,
  //   fallbackLocale: store.state.localization.currentLocale,
  //   messages: locales
  // })
}
