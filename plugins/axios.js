export default function ({ $axios, redirect, req, beforeNuxtRender }) {
  let host = ''
  let apiSubdomain = ''

  if (process.server) {
    host = req.headers.host
  } else {
    host = window.location.host
  }
  // console.log('host>>>', host)
  // const baseDomain = '.tawreedimdad.com' || host.substring(host.indexOf('.'))
  const baseDomain = '.localhost:8000' || host.substring(host.indexOf('.'))
  const subDomain = host.split('.')[0]

  switch (subDomain) {
    case 'shop1-nuxt':
      apiSubdomain = 'shop1'
      break
    case 'shop2-nuxt':
      apiSubdomain = 'shop2'
      break
    case 'souq-nuxt':
      apiSubdomain = 'souq'
      break
    default:
      apiSubdomain = 'shop1'
  }
  const apiURL = `${apiSubdomain}${baseDomain}`
  $axios.setBaseURL(`http://${apiURL}/api/`)

  // $axios.onError((error) => {
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
