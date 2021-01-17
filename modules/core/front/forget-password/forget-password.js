import { mapState } from 'vuex'
import activationCode from '@/modules/core/front/modals/activation/code.vue'

export default {
  components: {
    activationCode
  },
  layout: 'front/empty',
  data () {
    return {
      form: {
        phone: null
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
        this.forgetPassword()
      }
    },
    forgetPassword () {
      this.$AuthService.forgetPassword(this.form)
        .then((response) => {
          this.$EventBus.$emit('open-activation-modal', {
            code: response.code,
            phone: this.form.phone,
            type: 'verify'
          })
        })
    }
  }
}
