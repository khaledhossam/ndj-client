import MetaTag from '@/components/head-meta-tags'
import { mapState } from 'vuex'
import ProductBlock from '@/modules/front/products/product-block/product-block.vue'
import _ from 'lodash'

export default {
  validate ({ params, query, store }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  layout: 'front/layout',
  components: {
    MetaTag,
    ProductBlock
  },
  async asyncData (context) {
    const [categories, brands] = await Promise.all([
      context.$HomeService.getAllCategories(),
      context.$HomeService.getBrands('?is_paginated=false')
    ])
    return { categories, brands }
  },
  data () {
    return {
      title: this.$t('front.products'),
      gridClass: 'col-6 col-lg-4',
      parentClass: 'row products',
      products: [],
      subcategories: [],
      loading: false,
      metaData: {
        total: 0,
        from: 1,
        to: 6
      },
      queryParam: {
        current_page: 1,
        per_page: 6,
        publicSearch: '',
        orderBy: '',
        orderType: '',
        category: '',
        sub_categories: [],
        brands: [],
        price_from: '',
        price_to: ''
      },
      pages: _.range(6, 16, 3),
      sorts: [
        {
          key: 'most_selling',
          orderBy: 'most_selling',
          orderType: 'desc'
        },
        {
          key: 'least_selling',
          orderBy: 'most_selling',
          orderType: 'asc'
        },
        {
          key: 'highest_price',
          orderBy: 'price',
          orderType: 'desc'
        },
        {
          key: 'lowest_price',
          orderBy: 'price',
          orderType: 'asc'
        }
      ],
      param_id: this.$route.params.id
    }
  },
  async fetch() {
    if (this.param_id) {
      //* check on route for categories | brands */
      if (this.$route.name == 'category.products') {
        this.queryParam.category = this.param_id
        this.subcategories = await this.$HomeService.getAllSubCategories(this.param_id)
      } else {
        this.queryParam.brands.push(this.param_id)
      }
    }
    this.handlePaginatedData()
  },
  // call fetch only on client-side
  fetchOnServer: false,
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  created () {
  },
  methods: {
    handleServiceParams () {
      let queryParam = `?page=${this.queryParam.current_page}&
      per_page=${this.queryParam.per_page}&`

      if (this.queryParam.orderType != '') {
        queryParam = `${queryParam}&orderType=${this.queryParam.orderType}`
      }
      if (this.queryParam.orderBy != '') {
        queryParam = `${queryParam}&orderBy=${this.queryParam.orderBy}`
      }
      if (this.queryParam.category != '') {
        queryParam = `${queryParam}&category=${this.queryParam.category}`
      }
      if (this.queryParam.publicSearch != '') {
        queryParam = `${queryParam}&publicSearch=${this.queryParam.publicSearch}`
      }
      if (this.queryParam.sub_categories.length) {
        queryParam = `${queryParam}&sub_categories=${JSON.stringify(this.queryParam.sub_categories)}`
      }
      if (this.queryParam.brands.length) {
        queryParam = `${queryParam}&brands=${JSON.stringify(this.queryParam.brands)}`
      }
      if (this.queryParam.price_from != '') {
        queryParam = `${queryParam}&price_from=${this.queryParam.price_from}`
      }
      if (this.queryParam.price_to != '') {
        queryParam = `${queryParam}&price_to=${this.queryParam.price_to}`
      }
      return queryParam
    },
    async handlePaginatedData () {
      this.loading = true
      const queryParam = this.handleServiceParams()

      await this.$ProductFrontService.getFilterProducts(queryParam)
        .then((response) => {
          this.products = response.data
          let currentTotal = response.meta.total
          this.queryParam.per_page = response.meta.per_page
          this.queryParam.current_page = response.meta.current_page

          if (currentTotal / this.perPage > 1000) {
            currentTotal = this.perPage * 1000
          }
          this.metaData.total = currentTotal

          this.loading = false
        })
    },
    handleSearch (search) {
      this.queryParam.publicSearch = search
      //* Reset Page *//
      this.queryParam.current_page = 1
      //* call load data with query param search *//
      this.handlePaginatedData()
    },
    /*
    * Handle page-change event
    */
    onPageChange (event) {
      const page = event.target.value
      this.queryParam.current_page = page
      this.handlePaginatedData()
    },
    /*
    * Handle page-change event
    */
    onPerPageChange (event) {
      const page = event.target.value
      this.queryParam.per_page = page
      this.handlePaginatedData()
    },
    /*
    * Handle sort-change event
    */
    onSortChange (event) {
      const key = event.target.value
      const sort = this.sorts.find((sort) => sort.key == key)
      this.queryParam.orderBy = sort.orderBy
      this.queryParam.orderType = sort.orderType

      this.handlePaginatedData()
    },
    toggleDisplay () {
      this.gridClass = (this.gridClass == 'col-6 col-lg-4' ? 'col-12' : 'col-6 col-lg-4')
      this.parentClass = (this.parentClass == 'row products' ? 'row products list' : 'row products')
    },
    toggleSubCategories (id) {
      //** check if exist */
      const index = this.queryParam.sub_categories.findIndex((sub) => sub === id)
      if (index >= 0) {
        this.queryParam.sub_categories.splice(index, 1)
      } else {
        this.queryParam.sub_categories.push(id)
      }
      debugger
      this.handlePaginatedData()
    },
    toggleBrands (id) {
      //** check if exist */
      const index = this.queryParam.brands.findIndex((brand) => brand === id)
      if (index >= 0) {
        this.queryParam.brands.splice(index, 1)
      } else {
        this.queryParam.brands.push(id)
      }
      this.handlePaginatedData()
    }
  },
  watch: {
    '$route.query': '$fetch'
  }
}
