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
  name: 'Brands',
  components: {
    FilePicker,
    CardComponent,
    TitleBar
  },
  async asyncData (context) {
    if (context.params.id) {
      const brandDetail = await context.$BrandService.brandDetails(context.params.id)
      return { brandDetail }
    }
  },
  // fetchOnServer: false,
  data () {
    return {
      titlePage: this.$t('admin.brands'),
      image: null,
      uploaderFolder: 'brands',
      enableSubmit: true,
      form: {
        en: {
          name: ''
        },
        ar: {
          name: ''
        },
        image: null,
        is_active: true
      },
      param_id: this.$route.params.id,
      customEvents: []
    }
  },
  computed: {
    titleBar () {
      return this.form.id ? this.$t('admin.edit') : this.$t('admin.create')
    },
    titleStack () {
      return [this.$t('admin.brands'), this.$t('admin.create')]
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
    this.brandDetails()
  },
  beforeDestroy () {
    this.customEvents.forEach(function (customEvent) {
      // eslint-disable-next-line no-undef
      this.$EventBus.$off(customEvent.eventName, customEvent.callback)
    }.bind(this))
  },
  methods: {
    brandDetails () {
      if (this.brandDetail) {
        this.reAssignForm(this.brandDetail)
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
      this.form = { ...this.form, ...obj }
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
          this.updateBrand()
        } else {
          this.createBrand()
        }
      }
    },
    createBrand () {
      this.$BrandService.createBrand(this.form)
        .then(() => {
          this.$router.push({ name: 'admin.brands' })
          this.buefyBar(this.$t('admin.created_successfully'))
        })
    },
    updateBrand () {
      this.$BrandService.updateBrand(this.form, this.param_id)
        .then(() => {
          this.$router.push({ name: 'admin.brands' })
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
