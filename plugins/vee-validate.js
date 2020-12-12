import Vue from 'vue'
// import { localize, ValidationProvider, ValidationObserver } from 'vee-validate'
import VeeValidate, { Validator } from 'vee-validate'

import ar from 'vee-validate/dist/locale/ar'
import en from 'vee-validate/dist/locale/en'

import enAttributes from '~/locales/attributes-translation/en-attributes'
import arAttributes from '~/locales/attributes-translation/ar-attributes'

// https://logaretm.github.io/vee-validate/advanced/server-side-validation.html#setting-errors-manually

// Install English and Arabic locales.
Validator.localize({
  en: {
    messages: en.messages,
    attributes: enAttributes
  },
  ar: {
    messages: ar.messages,
    attributes: arAttributes
  }
})
export default ({ store }) => {
  Vue.use(
    VeeValidate, {
      locale: store.state.localization.currentLocale,
      dictionary: {
        en: {
          messages: en.messages,
          attributes: enAttributes
        },
        ar: {
          messages: ar.messages,
          attributes: arAttributes
        }
      }
    }
  )
}
