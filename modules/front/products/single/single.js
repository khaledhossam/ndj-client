import MetaTag from '@/components/head-meta-tags'
import { mapState } from 'vuex'
import ProductBlock from '@/modules/front/products/product-block/product-block.vue'
import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'

export default {
  validate ({ params, query, store }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  layout: 'front/layout',
  components: {
    MetaTag,
    ProductBlock,
    VueSlickCarousel
  },
  async asyncData (context) {
    const [ product ] = await Promise.all([
      context.$ProductFrontService.getProductDetail(context.params.id),
    ])
    return { product }
  },
  data () {
    return {
      title: this.$t('front.home'),
      ratings: [],
      metaData: {
        total: 0,
        default_per_page: 1,
        per_page: 0,
        current_page: 1
      },
      param_id: this.$route.params.id,
      cart: {
        product_id: this.$route.params.id,
        quantity: 1,
        extra_properties: []
      },
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
  async fetch() {
    this.loadMoreRatings()
  },
  // call fetch only on client-side
  fetchOnServer: false,
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      isAuthenticated: state => state.auth.front.isAuthenticated,
      carts: state => state.frontStore.carts
    }),
    discountValue () {
      return this.product.price_after_tax - this.product.price_after_discount
    },
    enableLoadMore () {
      return this.metaData.total > this.metaData.per_page
    },
    totalRate () {
      return (Number(this.product.rate)).toFixed()
    },
    dynamicOptions () {
      let options =  this.product.extra_properties.filter(function(obj){
        if (obj.property.has_options && obj.value.length) {
          obj.selected_prop_id = obj.value[0].id || null
          return obj
        }
      })
      return options
    },
    dynamicFields () {
      return this.product.extra_properties.filter((obj) => obj.property.has_options === false)
    },
    urlLink () {
      if (process.client) {
        let link = `${window.location.origin}${this.$route.path}`
        debugger
        return link
      }
      // return `http://localhost:3000/products/${this.product.id}`
    }
  },
  created () {
  },
  methods: {
    async loadMoreRatings () {
      const queryParam = `?page=${this.metaData.current_page}&per_page=${Number(this.metaData.default_per_page) + Number(this.metaData.per_page)}`
      let rateResponse = await this.$ProductFrontService.getProductRatings(this.param_id, queryParam)

      this.ratings = rateResponse.data
      this.metaData.total = rateResponse.meta.total
      this.metaData.per_page = rateResponse.meta.per_page
    },
    selectedDynamicProps (optionId, index) {
      this.dynamicOptions[index].selected_prop_id = optionId
      debugger
    },
    async addToCart () {
      //* handle extra properties */
      this.cart.extra_properties = this.dynamicOptions.map(function(obj){
        return {
          property_id: obj.property.id,
          property_option_id: obj.selected_prop_id
        }
      })
      //* check if user logged in or not */
      if (this.isAuthenticated) {
        await this.$CartService.addToCart(this.cart)
        .then(() => {
          this.buefyBar(this.$t('front.added_successfully'))
        })
      } else {
        let item = this.cloneItem(this.cart)
        item.product = {
          id: this.product.id,
          name: this.product.name,
          discount: this.product.discount,
          free_product: this.product.free_product,
          price_after_tax: this.product.price_after_tax,
          price_after_discount: this.product.price_after_discount,
          primary_attachment: this.product.primary_attachment
        }
        //* to do not mutate vuex store state outside mutation handlers */
        let cartStore = this.cloneItem(this.carts)
        //* check if item exist in store to update it */
        let index = cartStore.findIndex((cart) => cart.product.id === this.product.id)
        if (index >= 0) {
          cartStore[index] = item
        } else {
          cartStore.push(item)
        }
        this.$store.commit('frontStore/setCarts', cartStore)
        this.buefyBar(this.$t('front.added_successfully'))
      }
    }
  },
  // head () {
  //   return {
      // link: [
      //   { rel: 'stylesheet', href: require('~/assets/front/css/ninja-slider.css') },
      //   { rel: 'stylesheet', href: require('~/assets/front/css/thumbnail-slider.css') },
      // ],
      // script: [
      //   // { src: require('~/assets/front/js/ninja-slider.js'), mode: 'client' },
      //   // { src: require('~/assets/front/js/thumbnail-slider.js'), mode: 'client' }
      // ]
  //   }
  // },
  head() {
    return {
      title: 'Nafaes',
      link: [
        { rel: 'stylesheet', href: require('~/assets/front/css/ninja-slider.css') },
        { rel: 'stylesheet', href: require('~/assets/front/css/thumbnail-slider.css') },
      ],
      script: [
        // { src: require('~/assets/front/js/ninja-slider.js'), mode: 'client' },
        // { src: require('~/assets/front/js/thumbnail-slider.js'), mode: 'client' }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: this.product.description
        },
        { name: 'og:image', content: this.product.primary_attachment.file },
        { name: 'twitter:image', content: this.product.primary_attachment.file }
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
    }
  }
}
