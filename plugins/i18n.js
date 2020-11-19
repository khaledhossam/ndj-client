// import locales from '@/locales/index'
// import Vue from 'vue'
// import VueI18n from 'nuxt-i18n'

// Vue.use(VueI18n)
export default ({ app, store }) => {
  const currentLocale = store.state.localization.currentLocale

  app.i18n.defaultLocale = app.i18n.locale = app.i18n.fallbackLocale = currentLocale
  // app.i18n = new VueI18n({
  //   locale: store.state.localization.currentLocale,
  //   fallbackLocale: store.state.localization.currentLocale,
  //   messages: locales
  // })
}
