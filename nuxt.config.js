export default {
  target: 'server',
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s - NDJ',
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://fonts.googleapis.com/css?family=Nunito',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdn.materialdesignicons.com/4.9.95/css/materialdesignicons.min.css',
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/style.css',
    {src: '@/assets/admin/scss/main.scss'}
  ],

  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    {src: '~/plugins/hello.js', mode: 'server'}, //** call first time in application */
    {src: '~/plugins/axios.js'},
    { src: '~/plugins/after-each.js', mode: 'client' }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    '@nuxtjs/vuetify',
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // With options
    ['@nuxtjs/router', { /* module options */ }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    ['nuxt-buefy', { materialDesignIcons: false }],
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  env: {
    baseUrl: process.env.BASE_URL
  },
  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: ''
    // baseURL: process.env.BASE_URL || 'http://localhost:3000'
    // export default function({ $axios }) {
    //   if (process.client) {
    //     const host = window.location.hostname;
    //     $axios.setBaseURL("http://" + host + ":8080");
    //   }
    // }
    // baseURL: process.client
    // baseURL: baseDomain
    // reuseBrowserDomain: true
  },

  // publicRuntimeConfig: {
  //   axios: {
  //     browserBaseURL: process.env.BROWSER_BASE_URL
  //   }
  // },

  // privateRuntimeConfig: {
  //   axios: {
  //     baseURL: process.env.BASE_URL
  //   }
  // },
  router: {
    middleware: 'hello'
  },
  serverMiddleware: [
    {path: '/', handler: '~/server-middleware/logger.js'}
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
