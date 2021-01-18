import { mapState } from 'vuex'
import ProductItem from '@/modules/front/product-item/product-item.vue'

export default {
  props: {
    categories: {
      type: Array,
      required: true,
      default: () => []
    },
    brands: {
      type: Array,
      required: true,
      default: () => []
    },
    offers: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  components: {
    ProductItem
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      authUser: state => state.auth.front.authUser
    })
  },
  methods: {

  }
}
