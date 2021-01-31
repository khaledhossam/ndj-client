import MetaTag from '@/components/head-meta-tags'
import { mapState } from 'vuex'
import _ from 'lodash'

export default {
  layout: 'front/layout',
  components: {
    MetaTag
  },
  async asyncData (context) {
    let carts = []
    let subtotal = 0
    let metaData = {
      total: 0,
      per_page: 1,
      current_page: 1
    }
    const queryParam = `?page=${metaData.current_page}`
    if (context.store.state.auth.front.isAuthenticated) {
      const response = await context.$CartService.getCarts(queryParam)

      carts = response.cart.data
      subtotal = response.total
      metaData = {
        total: response.cart.meta.total,
        per_page: response.cart.meta.per_page,
        current_page: response.cart.meta.current_page
      }
    } else {
      carts = context.store.state.frontStore.carts
      //* calc total of products in cart */
      subtotal = (carts.reduce((total, item) => {
        let price = item.product.discount ? item.product.price_after_tax : item.product.price_after_discount
        return total + (price * item.quantity);
      }, 0)).toFixed(2);

      metaData = {
        total: carts.length,
        per_page: carts.length,
        current_page: 1
      }
    }
    return { carts, subtotal, metaData }
  },
  data () {
    return {
      title: this.$t('front.carts'),
      discount: {
        code: '',
        value: 0,
        type: '',
        applied_to: ''
      }
    }
  },
  computed: {
    ...mapState({
      currentLocale: state => state.localization.currentLocale,
      isAuthenticated: state => state.auth.front.isAuthenticated
    }),
    total () {
      return (this.subtotal - this.discountValue).toFixed(2)
    },
    discountValue () {
      if (this.discount.value) {
        //* check for type */
        if (this.discount.type.toLowerCase() == 'percentage') {
          return (this.discount.value / 100) * this.subtotal
        } else {
          return this.discount.value
        }
      }
    }
  },
  created () {
    this.debouncedItemQty = _.debounce(this.updateItem, 1000)
  },
  methods: {
    async loadCarts () {
      const queryParam = `?page=${this.metaData.current_page}&per_page=${this.metaData.per_page}`
      const [ response ] = await Promise.all([
        this.$CartService.getCarts(queryParam)
      ])
      this.carts = response.cart.data
      this.subtotal = response.total
      this.metaData = {
        total: response.cart.meta.total,
        per_page: response.cart.meta.per_page,
        current_page: response.cart.meta.current_page
      }
    },
    async updateItem (item) {
      debugger
      //* check if user logged in or not */
      if (this.isAuthenticated) {
        await this.$CartService.updateItem({
          product_id: item.product.id,
          quantity: item.quantity
        })
          .then(() => {
            //* update calc of subtotal */
            this.calcSubTotal()
            this.buefyBar(this.$t('front.updated_successfully'))
          })
          .catch((err) => console.log('error', err))
      } else {
        let index = this.carts.findIndex((cart) => cart.product.id === item.product.id)
        if (index >= 0) {
          this.carts[index].quantity = item.quantity
          //* update calc of subtotal */
          this.calcSubTotal()
          this.$store.commit('frontStore/setCarts', this.carts)
        }
      }
    },
    async deleteItem (id) {
      //* check if user logged in or not */
      if (this.isAuthenticated) {
        await this.$CartService.deleteItem({ product_id: id })
          .then(() => {
            this.carts = this.carts.filter((item) => item.product.id != id)
            this.metaData.total-- //* decrement total */
            //* update calc of subtotal */
            this.calcSubTotal()
            this.buefyBar(this.$t('front.deleted_successfully'))
          })
          .catch((err) => console.log('error', err))
      } else {
        this.carts = this.carts.filter((item) => item.product.id != id)
        this.metaData.total-- //* decrement total */
        //* update calc of subtotal */
        this.calcSubTotal()
        this.$store.commit('frontStore/setCarts', this.carts)
      }
    },
    calcSubTotal () {
      this.subtotal = (this.carts.reduce((total, item) => {
        let price = item.product.discount ? item.product.price_after_tax : item.product.price_after_discount
        return total + (price * item.quantity);
      }, 0)).toFixed(2);
    },
    /*
      * Handle page-change event
    */
    onPageChange (page) {
      this.metaData.current_page = page
      this.loadCarts()
    },
    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        this.register()
      }
    },
    async submitDiscount () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        await this.$CartService.checkCoupon({ coupon: this.discount.code })
          .then((res) => {
            console.log('coupon res', res)
            this.discount = res
            this.buefyBar(this.$t('front.added_successfully'))
          })
          .catch((err) => console.log('error', err))
      }
    }
  }
}
