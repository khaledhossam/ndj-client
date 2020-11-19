export default function ({ isHMR, app, store, route, params, error, redirect }) {
  const localeStore = store.state.localization
  // if (isHMR) { // true only on client-side in dev mode
  //   return
  // }
  if (!localeStore.locales.includes(localeStore.currentLocale)) {
    return error({ message: 'This page could not be found.', statusCode: 404 })
  }
  app.i18n.defaultLocale = localeStore.currentLocale
}
