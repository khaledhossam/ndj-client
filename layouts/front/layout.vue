<template>
  <div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  component: {
  },
  data () {
    return {}
  },
  methods: {
  },
  head () {
    return {
      link: [
        { rel: 'stylesheet', href: require('~/assets/front/css/slick.css') },
        { rel: 'stylesheet', href: require('~/assets/front/css/fontawesome.css') },
        { rel: 'stylesheet', href: require('~/assets/front/css/style.css') }
      ],
      script: [
        { src: 'https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js' },
        { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js' },
        { src: 'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js' }
      ]
    }
  }
}
// if (process.client) {
//   $ = require("jquery");
//   //header search
//   $('.search-ms-icon').click(function(){
//     debugger
//     $(this).closest('.search').find('form').toggleClass('show');
//   })
// }
</script>
