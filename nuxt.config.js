// import router from "router/index"

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'ndj-nuxt',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/style.css'
  ],

  loading: {
    // color: 'green',
  },

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // With options
    ['@nuxtjs/router', { /* module options */ }]
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://jsonplaceholder.typicode.com/'
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

  // router: {
  //   extendRoutes(routes, resolve) {
  //     routes.push({
  //       name: 'custom',
  //       path: '/custom',
  //       component: resolve(__dirname, 'pages/blog.vue')
  //     })
  //   }
  // },
  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
