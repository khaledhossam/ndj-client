import { mapState } from 'vuex'

export default {
  props: {
    firstSubCats: {
      type: Array,
      required: true,
      default: () => []
    },
    secondSubCats: {
      type: Array,
      required: true,
      default: () => []
    },
    thirdSubCats: {
      type: Array,
      required: true,
      default: () => []
    }
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      firstCategory: state => state.frontStore.firstCategory,
      secondCategory: state => state.frontStore.secondCategory,
      thirdCategory: state => state.frontStore.thirdCategory
    })
  },
  methods: {
    selectedCat (category) {
      this.$store.commit('frontStore/setSelectedCategory', category)
      this.$router.push({ name: 'category.products', params: { id: category.id } })
    }
  },
}
