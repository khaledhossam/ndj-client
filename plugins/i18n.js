import Vue from 'vue'
import VeeValidate, { Validator } from 'vee-validate'
Vue.use(VeeValidate)

export default ({ app, store }) => {
  const currentLocale = store.state.localization.currentLocale
  Validator.localize(currentLocale)
  app.i18n.defaultLocale = app.i18n.locale = app.i18n.fallbackLocale = currentLocale
}
