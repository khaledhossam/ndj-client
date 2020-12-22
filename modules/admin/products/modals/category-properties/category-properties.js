import { mapState } from 'vuex'

export default {
  props: ['properties'],
  data () {
    return {
      categoryProperties: this.properties || [],
      icon: 'mdi-checkbox-blank-outline',
      customEvents: [
        { eventName: 'reset-properties', callback: this.resetProperties }
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
    removeSelectItem (arr, item) {
      const index = arr.indexOf(item.id)
      arr.splice(index, 1)
    },
    toggleSelectAll (formArr, originalArr) {
      this.$nextTick(() => {
        if (formArr.length) {
          this.icon = 'mdi-minus-box'
          formArr = []
        } else {
          this.icon = 'mdi-close-box'
          formArr = originalArr.map(obj => obj.store_id)
        }
      })
    },
    resetProperties (data) {
      this.categoryProperties = data
    },
    dateInput () {

    }
  },
  watch: {
    categoryProperties: {
      handler (val, oldVal) {
        console.info('prop comp', this.categoryProperties, val, oldVal)
        this.$EventBus.$emit('update-properties', this.properties)
      },
      deep: true
    }
  }
}
