<template>
  <div>
    <app-header
      :categories="categories"
      :brands="brands"
      :offers="offers"
    />
    <Nuxt />
    <app-footer
      :firstSubCats="firstSubCats"
      :secondSubCats="secondSubCats"
      :thirdSubCats="thirdSubCats"
    />
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
      context.$HomeService.getAllCategories(),
      context.$HomeService.getBrands('?is_paginated=false')
    ])
    //* store categories in front store to be used in home page content */
    context.store.commit('frontStore/setCategories', categories)
    context.store.commit('frontStore/setBrands', brands)
    //* initial value */
    const frontStore = context.store.state.frontStore
    let [ firstSubCats, secondSubCats, thirdSubCats ] = []
    //* check of each request */
    if (frontStore.firstCategory) {
      firstSubCats = await context.$HomeService.getAllSubCategories(`${frontStore.firstCategory.id}`)
    }
    if (frontStore.secondCategory) {
      secondSubCats = await context.$HomeService.getAllSubCategories(`${frontStore.secondCategory.id}`)
    }
    if (frontStore.thirdCategory) {
      thirdSubCats = await context.$HomeService.getAllSubCategories(`${frontStore.thirdCategory.id}`)
    }
    return { offers, categories, brands, firstSubCats, secondSubCats, thirdSubCats }
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
