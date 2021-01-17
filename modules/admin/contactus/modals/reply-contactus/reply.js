import mapValues from 'lodash/mapValues'
import TitleBar from '@/components/admin/TitleBar'
import CardComponent from '@/components/admin/CardComponent'
import FilePicker from '@/components/admin/FilePicker'
import { mapState } from 'vuex'

export default {
  validate ({ params, query, store }) {
    if (params.id) {
      return !isNaN(params.id)
    }
    return true
  },
  name: 'Advertisements',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    const categories = await context.$CategoryService.getCategories('?is_active=1&is_paginated=false&is_detailed=true')

    if (context.params.id) {
      const advertisementDetail = await context.$AdvertisementService.advertisementDetails(context.params.id)
      return { categories, advertisementDetail }
    }
    return { categories }
  },
  // fetchOnServer: false,
  data () {
    return {
      titlePage: this.$t('admin.advertisements'),
      image: null,
      uploaderFolder: 'ads',
      enableSubmit: true,
      orders: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      form: {
        en: {
          title: '',
          description: ''
        },
        ar: {
          title: '',
          description: ''
        },
        category_id: null,
        image: null,
        order: '',
        tax_percentage: 0,
        is_active: true
      },
      param_id: this.$route.params.id,
      customEvents: []
    }
  },
  computed: {
    titleBar () {
      return this.$route.params.id ? this.$t('admin.edit') : this.$t('admin.create')
    },
    titleStack () {
      return [this.$t('admin.advertisements'), this.$route.params.id ? this.$t('admin.edit') : this.$t('admin.create')]
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
    this.advertisementDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    advertisementDetails () {
      if (this.param_id) {
        this.reAssignForm(this.advertisementDetail)
      }
    },
    reAssignForm (data) {
      const obj = {
        en: {
          title: data?.en?.title,
          description: data?.en?.description
        },
        ar: {
          title: data?.ar?.title,
          description: data?.ar?.description
        },
        category_id: data?.category?.id
      }
      // override of form data
      this.form = { ...data, ...obj }
    },
    handleUploadFile (file) {
      this.enableSubmit = false

      if (this.form.image) {
        this.handleDeleteFile(this.form.image, this.uploaderFolder)
      }
      this.$UploadService.uploadSingleFile({
        file,
        path: this.uploaderFolder
      })
        .then((response) => {
          this.form.image = response.file
          this.enableSubmit = true
          this.buefyBar('File Uploaded Successfully')
        })
    },
    async submit () {
      const validData = await this.$validator.validateAll()

      if (validData) {
        if (this.param_id) {
          this.updateAdvertisement()
        } else {
          this.createAdvertisement()
        }
      }
    },
    createAdvertisement () {
      console.log(this.form)
      this.$AdvertisementService.createAdvertisement(this.form)
        .then(() => {
          this.$router.push({ name: 'admin.advertisements' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateAdvertisement () {
      this.$AdvertisementService.updateAdvertisement(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'admin.advertisements' })
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
