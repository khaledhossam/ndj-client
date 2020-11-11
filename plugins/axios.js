export default function ({ $axios, redirect, req, beforeNuxtRender }) {
  let host = ''
  let apiSubdomain = ''

  if (process.server) {
    host = req.headers.host
  } else {
    host = window.location.host
  }
  // console.log('host>>>', host)
  const baseDomain = '.tawreedimdad.com' || host.substring(host.indexOf('.'))
  const subDomain = host.split('.')[0]

  switch (subDomain) {
    case 'shop1-nuxt':
      apiSubdomain = 'shop1'
      break
    case 'shop2-nuxt':
      apiSubdomain = 'shop2'
      break
    default:
      apiSubdomain = 'shop1'
  }
  const apiURL = `${apiSubdomain}${baseDomain}`
  $axios.setBaseURL(`http://${apiURL}/api/v1/`)

  // $axios.onError((error) => {
  //   if (error.response.status === 500) {
  //     redirect('/sorry')
  //   }
  // })
}
