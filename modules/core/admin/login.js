import { mapState } from 'vuex'

export default {
  layout: 'admin/empty',
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
      const validData = await this.$validator.validateAll()

      if (validData) {
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
          .catch(() => {})
      }
    },
    handleReset () {
      this.$nextTick(() => this.$validator.reset())
    }

  }
}
