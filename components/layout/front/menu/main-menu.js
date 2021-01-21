import { mapState } from 'vuex'
import ProductBlock from '@/modules/front/products/product-block/product-block.vue'

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
    ProductBlock
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
