import { mapState } from 'vuex'
import CardComponent from '@/components/admin/CardComponent'
import TitleBar from '@/components/admin/TitleBar'
import ModalBox from '@/components/admin/ModalBox'
import QuickSearch from '@/modules/admin/global/search/quick-search.vue'

export default {
  name: 'Categories',
  components: {
    TitleBar,
    CardComponent,
    ModalBox,
    QuickSearch
  },
  filters: {
    /**
    * Filter to truncate string, accepts a length parameter
    */
    truncate (value, length) {
      return value.length > length
        ? value.substr(0, length) + '...'
        : value
    }
  },
  data () {
    return {
      titlePage: this.$t('admin.categories'),
      collection: [],
      isPaginated: true,
      searchValue: '',
      total: 0,
      loading: false,
      sortField: 'id',
      sortOrder: 'desc',
      defaultSortOrder: 'desc',
      page: 1,
      perPage: 0,
      queryParam: '',
      customEvents: [
        { eventName: 'handle-quick-search', callback: this.handleSearch },
        { eventName: 'event-delete-category', callback: this.handleDeleteCategory }
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
    titleStack () {
      return [this.$t('admin.categories')]
    },
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  mounted () {
    this.$EventBus.$emit('enable-quick-search', true)
    this.loadAsyncData()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    type (value) {
      if (value === true) {
        return 'alert-success'
      } else {
        return 'alert-danger'
      }
    },
    handleSearch (search) {
      this.searchValue = search
      //* Reset Page *//
      this.page = 1
      //* call load data with query param search *//
      this.loadAsyncData()
    },
    /*
    * Load async data
    */
    loadAsyncData () {
      this.loading = true
      this.queryParam = `?page=${this.page}&publicSearch=${this.searchValue}&orderBy=${this.sortField}&orderType=${this.sortOrder}&is_detailed=true`

      this.$CategoryService.getCategories(this.queryParam)
        .then((response) => {
          this.collection = response.data

          let currentTotal = response.meta.total
          this.perPage = response.meta.per_page

          if (currentTotal / this.perPage > 1000) {
            currentTotal = this.perPage * 1000
          }
          this.total = currentTotal

          this.loading = false
        })
        .catch(() => {
          this.collection = []
          this.total = 0
          this.loading = false
        })
    },
    /*
    * Handle page-change event
    */
    onPageChange (page) {
      this.page = page
      this.loadAsyncData()
    },
    /*
    * Handle sort event
    */
    onSort (field, order) {
      this.sortField = field
      this.sortOrder = order
      this.loadAsyncData()
    },
    handleDeleteCategory (id) {
      this.$CategoryService.deleteCategory(id)
        .then(() => {
          //* update list to remove this row *//
          this.collection = this.collection.filter((obj) => {
            return obj.id !== id
          })
        })
    },
    handleToggleStatus (id) {
      this.$CategoryService.toggleStatus(id)
        .then((response) => {
          //* update list to remove this row *//
          this.collection.forEach((element, index) => {
            if (element.id === response.id) {
              this.collection[index] = Object.assign(this.collection[index], response)
            }
          })
          this.buefyBar(this.$t('admin.updated_successfully'))
        })
    }
  },
  head () {
    return {
      title: this.titlePage
    }
  }
}
