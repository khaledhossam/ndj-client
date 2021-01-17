import { mapState } from 'vuex'
import activationCode from '@/modules/core/front/modals/activation/code.vue'

export default {
  components: {
    activationCode
  },
  layout: 'front/empty',
  data () {
    return {
      gender: [
        {
          key: 'male',
          en: { name: 'male' },
          ar: { name: 'ذكر' }
        },
        {
          key: 'female',
          en: { name: 'female' },
          ar: { name: 'أنثى' }
        }
      ],
      form: {
        name: null,
        email: null,
        phone: null,
        gender: null,
        accept: false,
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
        this.register()
      }
    },
    register () {
      this.$AuthService.frontRegister(this.form)
        .then((response) => {
          this.$EventBus.$emit('open-activation-modal', {
            code: response.code,
            phone: this.form.phone,
            type: 'activate'
          })
          this.buefyBar(this.$t('front.created_successfully'))
        })
    }
  }
}
