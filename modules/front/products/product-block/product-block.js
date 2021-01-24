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
  }
}
