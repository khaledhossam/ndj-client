import { mapState } from 'vuex'

export default {
  components: {
  },
  layout: 'front/layout',
  data () {
    return {
      form: {
        phone: null,
        password: null
      }
    }
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      carts: state => state.frontStore.carts
    })
  },
  methods: {
    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        this.login()
      }
    },
    login () {
      this.$AuthService.frontLogin(this.form)
        .then((response) => {
          this.$store.commit('auth/front/setAccessToken', response.access_token)
          this.$store.commit('auth/front/setAuthUser', response.user)
          //* check for visitor carts */
          if (this.carts.length) {
            this.handleLoggedInCarts()
          }
          this.$router.push({ name: 'home' })
          this.buefyBar(this.$t('front.logged_in_successfully'))
        })
    },
    async handleLoggedInCarts () {
      await this.$CartService.addToCart({ items: this.carts})
      .then(() => {
        //* empty store carts */
        this.$store.commit('frontStore/setCarts', [])
      })
    }
  }
}
