import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
import FilePicker from '@/components/admin/FilePicker'
import { mapState } from 'vuex'
import moment from 'moment'

export default {
  validate ({ params, query, store }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  name: 'Offers',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    const products = await context.$ProductService.getProductNames('?is_active=1&is_paginated=true&is_detailed=false')
    if (context.params.id) {
      const offerDetail = await context.$OfferService.offerDetails(context.params.id)
      return { products, offerDetail }
    }
    return { products }
  },
  // fetchOnServer: false,
  data () {
    return {
      titlePage: this.$t('admin.offers'),
      start_date: false,
      end_date: false,
      form: {
        en: {
          name: ''
        },
        ar: {
          name: ''
        },
        value: null, //* if type: percentage | value */
        start_date: null,
        end_date: null,
        type: null,
        products: [],
        free_product_id: null, //* if type: free product */
        is_active: true
      },
      param_id: this.$route.params.id,
      offerTypes: [
        {
          key: 'percentage',
          en: { name: 'Percentage' },
          ar: { name: 'نسبة مئوية' }
        },
        {
          key: 'value',
          en: { name: 'Value' },
          ar: { name: 'قيمة ثابتة' }
        },
        {
          key: 'free_product',
          en: { name: 'Free Product' },
          ar: { name: 'منتج مجانى هدية' }
        }
      ],
      customEvents: []
    }
  },
  computed: {
    titleBar () {
      return this.form.id ? this.$t('admin.edit') : this.$t('admin.create')
    },
    titleStack () {
      return [this.$t('admin.offers'), this.$t('admin.create')]
    },
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    }),
    computedDateFormattedMomentjs () {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    }
  },
  created () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  mounted () {
    this.offerDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    changeOfferType (type) {
      this.form.value = ''
    },
    offerDetails () {
      if (this.offerDetail) {
        this.reAssignForm(this.offerDetail)
      }
    },
    reAssignForm (data) {
      const obj = {
        en: {
          name: data.en.name
        },
        ar: {
          name: data.ar.name
        }
      }
      // override of form data
      this.form = { ...data, ...obj }
    },
    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        if (this.param_id) {
          this.updateOffer()
        } else {
          this.createOffer()
        }
      }
    },
    createOffer () {
      this.$OfferService.createOffer(this.form)
        .then(() => {
          this.$router.push({ name: 'admin.offers' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateOffer () {
      this.$OfferService.updateOffer(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'admin.offers' })
          this.buefyBar(this.$t('admin.updated_successfully'))
        })
    },
    handleReset () {
      this.form = mapValues(this.form, (item) => {
        if (item && (typeof item === 'object' || Array.isArray(item))) {
          return []
        }
        return null
      })
      this.buefyBar(this.$t('admin.reset_successfully'))
    }
  },
  head () {
    return {
      title: this.titlePage
    }
  }
}
