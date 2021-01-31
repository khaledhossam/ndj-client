import { mapState } from 'vuex'

export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({})
    },
    gridClass: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      isAuthenticated: state => state.auth.front.isAuthenticated
    })
  },
  methods: {
    async toggleFavourite (product) {
      if (this.isAuthenticated) {
        if (product.is_favourite) {
          await this.$ProductFrontService.deleteFavourite({ product_id: product.id })
          .then(() => {
            this.product.is_favourite = false
            this.buefyBar(this.$t('front.deleted_successfully'))
          })
          .catch((err) => console.log(err))
        } else {
          await this.$ProductFrontService.addFavourite({ product_id: product.id })
          .then(() => {
            this.product.is_favourite = true
            this.buefyBar(this.$t('front.added_successfully'))
          })
          .catch((err) => console.log(err))
        }
      } else {
        this.buefyBar(this.$t('front.fav_unauthenticated'))
      }
    }
  }
}
