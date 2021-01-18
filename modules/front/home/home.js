import MetaTag from '@/components/head-meta-tags'
import { mapState } from 'vuex'
import AppSlider from '@/components/layout/front/slider/slider.vue'
import ProductItem from '@/modules/front/product-item/product-item.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  layout: 'front/layout',
  components: {
    MetaTag,
    AppSlider,
    ProductItem,
    VueSlickCarousel
  },
  async asyncData (context) {
    const [ads, suggestions, mostSellerProducts] = await Promise.all([
      context.$HomeService.getAds('?is_paginated=false'),
      context.$HomeService.getProductSuggestions('?per_page=4')
        .then(res => res.data),
      context.$HomeService.getMostSellerProducts('?per_page=4')
        .then(res => res.data)
    ])
    const frontStore = context.store.state.frontStore
    //* initial value */
    let [ firstCatProducts, secondCatProducts, thirdCatProducts ] = []
    //* check of each request */
    if (frontStore.firstCategory) {
      firstCatProducts = await context.$HomeService.getCategoryProducts(`?per_page=4&category=${frontStore.firstCategory.id}`)
        .then(res => res.data)
    }
    if (frontStore.secondCategory) {
      secondCatProducts = await context.$HomeService.getCategoryProducts(`?per_page=4&category=${frontStore.secondCategory.id}`)
        .then(res => res.data)
    }
    if (frontStore.thirdCategory) {
      thirdCatProducts = await context.$HomeService.getCategoryProducts(`?per_page=4&category=${frontStore.thirdCategory.id}`)
        .then(res => res.data)
    }
    debugger
    return { ads, suggestions, mostSellerProducts, firstCatProducts, secondCatProducts, thirdCatProducts }
  },
  data () {
    return {
      title: this.$t('front.home'),
      settings: {
        rtl: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        initialSlide: 1,
        speed: 1000,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                }
            }
        ]
      }
    }
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      isAuthenticated: state => state.auth.front.isAuthenticated,
      categories: state => state.frontStore.categories,
      brands: state => state.frontStore.brands,
      firstCategory: state => state.frontStore.firstCategory,
      secondCategory: state => state.frontStore.secondCategory,
      thirdCategory: state => state.frontStore.thirdCategory
    })
  },
  created () {
  },
  methods: {

  }
}
