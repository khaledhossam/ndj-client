import Vue from 'vue'

export default function ({ $axios, redirect, store, req, beforeNuxtRender }) {
  const apiURL = getApiUrl()

  $axios.setBaseURL(`http://${apiURL}/backend/public/api`)

  function getApiUrl () {
    let host = ''
    let apiSubdomain = ''

    if (process.server) {
      host = req.headers.host
    } else {
      host = window.location.host
    }
    const baseDomain = '.manssah.com' || host.substring(host.indexOf('.'))
    const subDomain = host.split('.')[0]

    switch (subDomain) {
      case 'shop1-nuxt':
        apiSubdomain = 'shop1'
        break
      case 'shop2-nuxt':
        apiSubdomain = 'shop2'
        break
      default:
        apiSubdomain = 'store1'
    }
    return `${apiSubdomain}${baseDomain}`
  }

  function getHeaders () {
    const accessToken = store.state.auth.admin.accessToken
    const headers = {
      // 'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Accept-Language': store.state.localization.currentLocale
    }
    if (accessToken) {
      headers.Authorization = accessToken
    }
    return headers
  }

  // Add a request interceptor
  $axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    config.headers = getHeaders()
    return config
  }, function (error) {
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  $axios.interceptors.response.use(function (response) {
    // Do something with response data
    return Promise.resolve(response.data)
  }, function (error) {
    const err = error.response.data
    //* generic error *//
    Vue.prototype.$buefy.snackbar.open({
      message: err.error,
      queue: false
    })
    // Do something with response error
    return Promise.reject(err)
  })
  // $axios.onError((error) => {
  //   return error
  //   if (error.response.status === 500) {
  //     redirect('/sorry')
  //   }
  // })
  // $axios.onRequest((config) => {
  //   // ...
  //   // Refresh JWT token if needed
  //   // ...
  //   config.headers['Authorization'] = `Bearer ${token}`
  //   return config
  // })
}
