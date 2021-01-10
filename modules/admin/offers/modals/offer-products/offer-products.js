import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      modalName: 'offerProductsModal',
      products: [],
      product_ids: [], //* ids */
      productFullDetails: [], //* array of objects */
      bindProp: '',
      inputType: '',
      modalProps: {
        width: '600px',
        height: 'auto',
        minHeight: 500,
        scrollable: true
      },
      icon: 'mdi-checkbox-blank-outline',
      total: 0,
      loading: false,
      page: 1,
      perPage: 0,
      searchValue: '',
      customEvents: [
        { eventName: 'handle-quick-search', callback: this.handleSearch },
        { eventName: 'open-products-modal', callback: this.handleDataModal }
      ]
    }
  },
  created () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))

    this.debouncedNormalSearch = _.debounce(this.handleSearch, 1000)
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  destroyed () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  mounted () {},
  methods: {
    handleDataModal (data) {
      //* get products */
      this.$nextTick(() => {
        //* Vue performs DOM updates asynchronously */
        this.handlePaginatedData()
      })
      //* bind data */
      this.bindProp = data.bindProp //* products | free product */
      this.inputType = data.inputType //* checkbox | radio */
      this.product_ids = data.selectedProducts
      // this.productFullDetails = data.productDetails
      //* show modal */
      this.showModal()
    },
    showModal () {
      //* show modal */
      this.$modal.show(this.modalName)
    },
    toggleProducts (product) {
      // if (this.inputType === 'checkbox') {
      //   //* check id to detect make check or uncheck */
      //   const isExist = this.productFullDetails.find(obj => obj.id === product.id)

      //   if (isExist) {
      //     this.productFullDetails = this.productFullDetails.filter(function (obj) {
      //       return obj.id !== product.id
      //     })
      //   } else {
      //     this.productFullDetails.push(product)
      //   }
      // } else {
      //   this.productFullDetails = [product]
      // }
    },
    async handlePaginatedData () {
      this.loading = true
      const queryParam = `?page=${this.page}&publicSearch=${this.searchValue}&is_active=1&is_detailed=false&is_paginated=true`

      await this.$ProductService.getProductNames(queryParam)
        .then((response) => {
          this.products = response.data
          let currentTotal = response.meta.total
          this.perPage = response.meta.per_page

          if (currentTotal / this.perPage > 1000) {
            currentTotal = this.perPage * 1000
          }
          this.total = currentTotal

          this.loading = false
        })
    },
    handleSearch (search) {
      this.searchValue = search
      //* Reset Page *//
      this.page = 1
      //* call load data with query param search *//
      this.handlePaginatedData()
    },
    /*
    * Handle page-change event
    */
    onPageChange (page) {
      this.page = page
      this.handlePaginatedData()
    },
    hideModal () {
      this.$modal.hide(this.modalName)
    },
    saveProducts () {
      this.$EventBus.$emit('update-offer-products', {
        bindProp: this.bindProp,
        inputType: this.inputType,
        selectedProducts: this.product_ids
        // productDetails: this.productFullDetails
      })
      this.hideModal()
    }
  }
}
