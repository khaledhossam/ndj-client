import { mapState } from 'vuex'

export default {
  components: {
  },
  layout: 'front/layout',
  props: {
    phone: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      form: {
        phone: this.phone,
        token: this.token,
        password: null,
        password_confirmation: null
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
        this.resetPassword()
      }
    },
    resetPassword () {
      this.$AuthService.resetPassword(this.form)
        .then(() => {
          this.$router.push({ name: 'login' })
          this.buefyBar(this.$t('front.updated_successfully'))
        })
    }
  }
}
