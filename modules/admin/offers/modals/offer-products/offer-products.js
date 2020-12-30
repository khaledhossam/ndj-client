import { mapState } from 'vuex'

export default {
  props: ['products'],
  data () {
    return {
      offerProducts: this.products || [],
      icon: 'mdi-checkbox-blank-outline',
      menu1: false,
      customEvents: [
        { eventName: 'reset-products', callback: this.resetProducts }
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
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    resetProperties (data) {
      this.offerProducts = data
    }
  },
  watch: {
    categoryProperties: {
      handler (val, oldVal) {
        this.$EventBus.$emit('update-products', this.offerProducts)
      },
      deep: true
    }
  }
}
