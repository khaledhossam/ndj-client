import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      modalName: 'activationCode',
      requiredCells: _.range(0, 4),
      activationCells: [],
      modalProps: {
        width: '600px',
        height: 'auto',
        minHeight: 500,
        scrollable: true
      },
      type: null,
      code: null,
      form: {
        phone: null,
        token: null
      },
      customEvents: [
        { eventName: 'open-activation-modal', callback: this.handleDataModal }
      ]
    }
  },
  created () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  destroyed () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  mounted () {},
  methods: {
    handleDataModal (data) {
      this.form.phone = data.phone
      //* until integrate sms in system */
      this.code = data.code
      /* verify for forget password | activate after register */
      this.type = data.type
      //* show modal */
      this.showModal()
      //* focus on first cell */
      // this.$nextTick(() => {
      //   this.$refs.codeRef[0].focus()
      // })
    },
    showModal () {
      //* show modal */
      this.$modal.show(this.modalName)
    },
    hideModal () {
      this.$modal.hide(this.modalName)
    },
    inputActivationCode (value, index) {
      this.$set(this.activationCells, index, value)
      this.form.token = this.activationCells.join('')
      //* check on next cell to focus */
      if (this.$refs.codeRef[index + 1] != null) {
        this.$refs.codeRef[index + 1].focus()
      }
    },
    async verifyCode () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        if (this.type === 'verify') {
          this.$AuthService.verifyPasswordCode(this.form)
            .then((response) => {
              this.$router.push({
                name: 'password.update',
                params: {
                  phone: this.form.phone,
                  token: this.form.token
                }
              })
            })
        } else {
          this.$set(this.form, 'code', this.form.token)

          this.$AuthService.activateRegisterCode(this.form)
            .then((response) => {
              this.$store.commit('auth/front/setAccessToken', response.access_token)
              this.$store.commit('auth/front/setAuthUser', response.user)

              this.$router.push({ name: 'home' })
            })
        }
      }
    }
  }
}
