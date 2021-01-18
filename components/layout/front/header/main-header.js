import { mapState } from 'vuex'
import MenuHeader from '@/components/layout/front/menu/menu.vue'

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
    MenuHeader
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      authUser: state => state.auth.front.authUser
    })
  },
  methods: {
    logout () {
      this.$store.dispatch('clearAllFront')
      this.$router.replace({ name: 'login' })

      this.$buefy.snackbar.open({
        message: this.$t('front.logged_out_successfully'),
        queue: false
      })
    }
  }
}
