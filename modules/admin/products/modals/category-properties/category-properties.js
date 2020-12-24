import { mapState } from 'vuex'

export default {
  props: ['properties'],
  data () {
    // const today = new Date()
    return {
      categoryProperties: this.properties || [],
      icon: 'mdi-checkbox-blank-outline',
      minDate: new Date(),
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
    dateFormatter (dt) {
      return dt.toLocaleDateString()
    },
    dateInput (index) {
      const value = this.categoryProperties[index].value
      this.categoryProperties[index].value = value.toLocaleDateString()
    },
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
          formArr = originalArr.map(obj => obj.id)
        }
      })
    },
    resetProperties (data) {
      this.categoryProperties = data
    }
  },
  watch: {
    categoryProperties: {
      handler (val, oldVal) {
        console.log('data', this.categoryProperties)
        this.$EventBus.$emit('update-properties', this.categoryProperties)
      },
      deep: true
    }
  }
}
