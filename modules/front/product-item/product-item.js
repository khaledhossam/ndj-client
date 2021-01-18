export default {
  props: {
    product: {
      type: Object,
      required: true,
      default: () => ({})
    },
    gridClass: {
      type: String,
      required: true,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  computed: {
    price () {
      return product.discount ? product.price_after_discount : product.price_after_tax
    }
  }
}
