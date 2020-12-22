import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
import FilePicker from '@/components/admin/FilePicker'
import categoryProperties from '@/modules/admin/products/modals/category-properties/category-properties.vue'
import { mapState } from 'vuex'

export default {
  validate ({ params }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  name: 'products',
  components: {
    FilePicker,
    CardComponent,
    TitleBar,
    categoryProperties
  },
  async asyncData (context) {
    const [categories, brands] = await Promise.all([

      context.$PropertyService.getCategories('?is_paginated=false'),

      context.$ProductService.getBrands('?is_active=1&is_paginated=false')
    ])
    if (context.params.id) {
      const productDetail = await context.$ProductService.productDetails(context.params.id)

      return { categories, brands, productDetail }
    } else {
      return { categories, brands }
    }
  },
  data () {
    return {
      titlePage: this.$t('admin.products'),
      subcategories: [],
      stores: [],
      properties: [],
      uploaderFolder: 'products',
      form: {
        en: {
          name: '',
          description: '',
          tags: []
        },
        ar: {
          name: '',
          description: '',
          tags: []
        },
        category_id: '',
        subcategory_id: '',
        brand_id: '',
        quantity: '',
        price: '',
        barcode: '',
        max_purchase_quantity: '',
        is_unique: true,
        stores: [],
        properties: [],
        is_active: true,
        primary_attachment: {
          file: '',
          type: ''
        },
        attachments: []
      },
      syncEnTags: '', // sync search
      syncArTags: '', // sync search
      param_id: this.$route.params.id,
      icon: 'mdi-checkbox-blank-outline',
      queryParam: '?is_active=1&is_paginated=false',
      customEvents: [
        { eventName: 'update-properties', callback: this.updateProperties },
        { eventName: 'handle-uploader', callback: this.handleUploadFile }
      ]
    }
  },
  computed: {
    titleBar () {
      return this.form.id ? this.$t('admin.edit') : this.$t('admin.create')
    },
    titleStack () {
      return [this.$t('admin.products'), this.$t('admin.create')]
    },
    ...mapState({
      currentLocale: state => state.localization.currentLocale
    })
  },
  created () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$on(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  mounted () {
    this.productDetails()
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
    updateTags (tags, inputSearch) {
      this.$nextTick(() => {
        tags.push(...inputSearch.split(','))
        this.$nextTick(() => {
          inputSearch = ''
        })
      })
    },
    toggleUnique (isUnique) {
      if (!isUnique) {
        this.$ProductService.getStores(this.queryParam)
          .then((response) => {
            this.stores = response
          })
      } else {
        this.form.stores = []
      }
    },
    async changeCategory (value) {
      //* reset subcategory value before load new data */
      this.form.subcategory_id = ''
      this.form.properties = []

      const response = await Promise.all([
        this.$ProductService.getSubcategories(value, this.queryParam),

        this.$ProductService.getProperties(value, this.queryParam)
      ])
      this.subcategories = response[0]

      this.properties = response[1].map((obj) => {
        if (obj.property_type.has_options) {
          obj.value = []
        } else {
          obj.value = ''
        }
        return obj
      })
      this.$EventBus.$emit('reset-properties', this.properties)
    },
    updateProperties (data) {
      this.properties = data
    },
    handleUploadFile (data) {
      if (Array.isArray(data)) {
        this.$UploadService.uploadMultipleFiles({
          files: data,
          path: this.uploaderFolder
        })
          .then((response) => {
            this.form.attachments = response
            this.buefyBar(this.$t('admin.attachment_uploaded_successfully'))
          })
      } else {
        this.$UploadService.uploadSingleFile({
          file: data,
          path: this.uploaderFolder
        })
          .then((response) => {
            this.form.primary_attachment = response
            this.buefyBar(this.$t('admin.attachment_uploaded_successfully'))
          })
      }
    },
    productDetails () {
      if (this.productDetail) {
        this.reAssignForm(this.productDetail)
      }
    },
    reAssignForm (data) {
      const obj = {
        categories: data.categories.map(category => category.id)
      }
      // overwrite of form data
      this.form = { ...data, ...obj }
    },
    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        if (this.param_id) {
          this.updateProduct()
        } else {
          this.createProduct()
        }
      }
    },
    createProduct () {
      this.$ProductService.createProduct(this.form)
        .then(() => {
          this.$router.push({ name: 'products' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateProduct () {
      this.$ProductService.updateProduct(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'products' })
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
