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
    //* declare default values */
    let subcategories = []
    let products = []
    let metaData = {
      total: 0,
      from: 1,
      to: 6
    }
    let queryParam = {
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
    }
    let query = `?per_page=${queryParam.per_page}`
    // console.log('params', context.query.search)
    const [categories, brands] = await Promise.all([
      context.$HomeService.getAllCategories(),
      context.$HomeService.getBrands('?is_paginated=false')
    ])
    if (context.query.search) {
      queryParam.publicSearch = context.query.search
      query = `${query}&publicSearch=${queryParam.publicSearch}`
    }
    if (context.params.id) {
      //* check on route for categories | brands */
      if (context.route.name == 'category.products') {
        queryParam.category = context.params.id
        query = `${query}&category=${queryParam.category}`
        subcategories = await context.$HomeService.getAllSubCategories(context.params.id)
      } else if (context.route.name == 'brand.products'){
        queryParam.brands.push(context.params.id)
        query = `${query}&brands=${JSON.stringify(queryParam.brands)}`
      } else if (context.route.name == 'subcategory.products') {
        queryParam.sub_categories.push(context.params.id)
        query = `${query}&sub_categories=${JSON.stringify(queryParam.sub_categories)}`
      }
    }

    await context.$ProductFrontService.getFilterProducts(query)
    .then((response) => {
      products = response.data
      let currentTotal = response.meta.total
      queryParam.per_page = response.meta.per_page
      queryParam.current_page = response.meta.current_page

      metaData.total = currentTotal
    })
    return { categories, brands, products, subcategories, queryParam, metaData }
  },
  data () {
    return {
      title: this.$t('front.products'),
      gridClass: 'col-6 col-lg-4',
      parentClass: 'row products',
      loading: false,
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
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      selectedCategory: state => state.frontStore.selectedCategory
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
    // '$route.query': '$fetch'
    '$route.query': function (val, oldVal) {
      this.handleSearch(val.search)
    },
    deep: true
  }
}
