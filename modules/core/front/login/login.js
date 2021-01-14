import { mapState } from 'vuex'

export default {
  components: {
  },
  layout: 'front/empty',
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
      currentLocale: state => state.localization.currentLocale
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

          this.$router.push({ name: 'home' })
          this.buefyBar(this.$t('front.logged_in_successfully'))
        })
    }
  }
}
