import _ from 'lodash'

export default {
  data () {
    return {
      isSearch: false,
      searchValue: '',
      customEvents: [
        { eventName: 'enable-quick-search', callback: this.enableSearch },
        { eventName: 'reset-quick-search', callback: this.resetSearch }
      ]
    }
  },
  created () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))
    // eslint-disable-next-line no-undef
    this.debouncedNormalSearch = _.debounce(this.search, 1000)
  },
  mounted () {
    this.searchValue = ''
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    enableSearch (flag) {
      this.isSearch = flag
    },
    resetSearch () {
      this.searchValue = ''
    },
    search () {
      this.$EventBus.$emit('handle-quick-search', this.searchValue)
    }
  }
}
