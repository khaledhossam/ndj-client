<template>
  <div>
    <app-header
      :categories="categories"
      :brands="brands"
      :offers="offers"
    />
    <Nuxt />
    <app-footer />
  </div>
</template>

<script>

import AppHeader from '@/components/layout/front/header/header.vue'
import AppFooter from '@/components/layout/front/footer/footer.vue'

export default {
  layout: 'front/layout',
  Name: 'frontIndex',
  components: {
    AppHeader,
    AppFooter
  },
  async asyncData (context) {
    const [offers, categories, brands] = await Promise.all([
      context.$HomeService.getOffers('?per_page=2').then(res => res.data),
      context.$HomeService.getCategories('?is_paginated=false'),
      context.$HomeService.getBrands('?is_paginated=false')
    ])
    //* store categories in front store to be used in home page content */
    context.store.commit('frontStore/setCategories', categories)
    context.store.commit('frontStore/setBrands', brands)

    return { offers, categories, brands }
  },
  data () {
    return {}
  },
  created () {

  },
  mounted () {},
  methods: {}
}
</script>

<style scoped>

</style>
