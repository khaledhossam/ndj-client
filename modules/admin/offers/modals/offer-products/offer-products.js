import { mapState } from 'vuex'

export default {
  data () {
    return {
      modalName: 'offerProductsModal',
      products: [],
      selectedProducts: [],
      modalProps: {
        width: '600px',
        height: 'auto',
        minHeight: 500,
        scrollable: true
      },
      icon: 'mdi-checkbox-blank-outline',
      customEvents: [
        { eventName: 'open-products-modal', callback: this.showModal }
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
    showModal (data) {
      this.products = data.products.data
      this.selectedProducts = data.offerProducts
      //* show modal */
      this.$modal.show(this.modalName)
    },
    hideModal () {
      this.$modal.hide(this.modalName)
    },
    saveProducts () {
      this.$EventBus.$emit('update-offer-products', this.selectedProducts)
      this.hideModal()
    }
  }
}
