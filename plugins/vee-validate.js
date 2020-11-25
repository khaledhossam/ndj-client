import Vue from 'vue'
// import VeeValidate from 'vee-validate'
// import { extend } from 'vee-validate';
import { localize, ValidationProvider, ValidationObserver } from 'vee-validate'

import ar from 'vee-validate/dist/locale/ar.json'
import en from 'vee-validate/dist/locale/en.json'

import enAttributes from '~/locales/attributes-translation/en-attributes'
import arAttributes from '~/locales/attributes-translation/ar-attributes'

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

// Install English and Arabic locales.
localize({
  en: {
    messages: en.messages,
    attributes: enAttributes
  },
  ar: {
    messages: ar.messages,
    attributes: arAttributes
  }
})
// Vue.use(
//   VeeValidate, {
//     locale: 'ar',
//     dictionary: {
//       en: {
//         messages: en.messages,
//         attributes: enAttributes
//       },
//       ar: {
//         messages: ar.messages,
//         attributes: arAttributes
//       }
//     }
//   }
// )
