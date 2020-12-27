import { mapState } from 'vuex'
import moment from 'moment'
// import { format, parseISO } from 'date-fns'

export default {
  props: ['properties'],
  data () {
    // const today = new Date()
    return {
      categoryProperties: this.properties || [],
      icon: 'mdi-checkbox-blank-outline',
      menu1: false,
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
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
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
