import { ValidationProvider, ValidationObserver } from 'vee-validate'

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
  methods: {
    handleSubmit () {
      this.submitted = true
      // this.$validator.validate().then((valid) => {
      //   if (valid) {
      //     // Successfully validated & update the data.
      //   }
      // })
    },
    handleReset () {
      this.$nextTick(() => this.$validator.reset())
    }

  }
}
