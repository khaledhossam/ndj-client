import { ValidationProvider, ValidationObserver } from 'vee-validate'
import { mapState } from 'vuex'

export default {
  components: {
    ValidationProvider,
    ValidationObserver
  },
  layout: 'empty-layout',
  data () {
    return {
      submitted: false,
      form: {
        email: '',
        password: '',
        remember: false
      }
    }
  },
  computed: {
    ...mapState({
      accessToken: state => state.auth.admin.accessToken,
      isAuthenticated: state => state.auth.admin.isAuthenticated
    })
  },
  methods: {
    async handleSubmit () {
      this.submitted = true
      // this.$validator.validate().then((valid) => {
      //   if (valid) {
      //     // Successfully validated & update the data.
      //   }
      // })
      await this.$AuthService.adminLogin(this.form)
        .then((response) => {
          this.$store.commit('auth/admin/setAccessToken', response.access_token)
          this.$store.commit('auth/admin/setAuthUser', response.user)

          this.$router.replace({ name: 'statistics' })

          this.$buefy.snackbar.open({
            message: this.$t('admin.logged_in_successfully'),
            queue: false
          })
        })
        .catch(err =>
          this.$buefy.snackbar.open({
            message: err.message,
            queue: false
          })
        )
    },
    handleReset () {
      this.$nextTick(() => this.$validator.reset())
    }

  }
}
